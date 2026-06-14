#!/usr/bin/env node
// @ts-check
/**
 * koalaui - the Koala UI CLI (two-tier).
 *
 *   koalaui init                 set up tokens, core lib helpers and base deps
 *   koalaui add <item...>        copy components/sections (and their deps) into your project
 *   koalaui list                 list available items (free + pro)
 *
 * Tiers:
 *   FREE  components/ui + lib + tokens - fetched from the PUBLIC repo, no auth.
 *   PRO   sections / pages / templates - fetched from the PRIVATE repo; requires a
 *         GitHub token with read access (the paywall). PRO items can depend on FREE
 *         ones; those still come from the public repo automatically.
 *
 * PRO auth - a GitHub token with read access to the pro repo, resolved in order:
 *   1. $KOALAUI_TOKEN   2. $GH_TOKEN   3. $GITHUB_TOKEN   4. `gh auth token`
 *
 * Flags:
 *   --cwd <dir>        target project root (default: current directory)
 *   --registry <dir>   read FREE files from a local checkout instead of the repo (dev)
 *   --pro <dir>        read PRO files from a local checkout (dev; default ../koala-ui-pro)
 *   --branch <b>       branch (default: main)
 *   --token <t>        GitHub token (overrides env / gh)
 *   --overwrite        overwrite files that already exist
 *   --no-install       write files but don't run the package manager
 *   -h, --help         show this help
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, dirname, isAbsolute } from "node:path"
import { execSync } from "node:child_process"

const DEFAULT_PUBLIC_REPO = "TheMrdp/koala-ui"
const DEFAULT_BRANCH = "main"
const CONTACT = "https://github.com/TheMrdp/koala-ui"

// ── tiny ANSI ──────────────────────────────────────────────────────────────
const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
}
const log = (s = "") => console.log(s)
const ok = (s) => log(`${c.green("✓")} ${s}`)
const info = (s) => log(`${c.cyan("›")} ${s}`)
const warn = (s) => log(`${c.yellow("!")} ${s}`)
class FailError extends Error {}
const fail = (s) => {
  throw new FailError(s)
}

// ── arg parsing ──────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = {
    _: [],
    cwd: process.cwd(),
    registry: null,
    pro: null,
    branch: DEFAULT_BRANCH,
    token: null,
    overwrite: false,
    install: true,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--cwd") out.cwd = argv[++i]
    else if (a === "--registry") out.registry = argv[++i]
    else if (a === "--pro") out.pro = argv[++i]
    else if (a === "--branch") out.branch = argv[++i]
    else if (a === "--token") out.token = argv[++i]
    else if (a === "--overwrite") out.overwrite = true
    else if (a === "--no-install") out.install = false
    else if (a === "-y" || a === "--yes") {}
    else if (a === "-h" || a === "--help") out.help = true
    else out._.push(a)
  }
  return out
}

// ── token resolution (lazy; only PRO needs it) ───────────────────────────────
function resolveToken(explicit) {
  if (explicit) return explicit
  for (const k of ["KOALAUI_TOKEN", "GH_TOKEN", "GITHUB_TOKEN"]) if (process.env[k]) return process.env[k]
  try {
    const t = execSync("gh auth token", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
    if (t) return t
  } catch {}
  return null
}
function requireToken(opts, itemName) {
  const token = resolveToken(opts.token)
  if (!token)
    fail(
      `"${itemName}" is a ${c.bold("PRO")} item - installing it requires repo access.\n` +
        `  No GitHub token found. Authenticate with one of:\n` +
        `    ${c.cyan("gh auth login")}   or   ${c.cyan("export KOALAUI_TOKEN=<token>")}\n` +
        `  Don't have access yet? → ${CONTACT}`
    )
  return token
}

// ── registry access (remote or local checkout) ───────────────────────────────
function makeRegistry(opts) {
  // LOCAL mode: free files from --registry dir, pro files from --pro / sibling
  if (opts.registry) {
    const freeBase = isAbsolute(opts.registry) ? opts.registry : join(process.cwd(), opts.registry)
    const proBase = opts.pro
      ? isAbsolute(opts.pro)
        ? opts.pro
        : join(process.cwd(), opts.pro)
      : join(freeBase, "..", "koala-ui-pro")
    const read = (base, path) => {
      const p = join(base, path)
      if (!existsSync(p)) throw new Error(`missing file: ${path} (in ${base})`)
      return readFileSync(p, "utf8")
    }
    return {
      label: c.dim(`local: ${freeBase}`),
      async meta() {
        const p = join(freeBase, "registry.json")
        if (!existsSync(p)) throw new Error(`no registry.json in ${freeBase}`)
        return JSON.parse(readFileSync(p, "utf8"))
      },
      async freeFile(path) {
        return read(freeBase, path)
      },
      async fetch(item, path) {
        return read(item.tier === "pro" ? proBase : freeBase, path)
      },
    }
  }

  // REMOTE mode (default)
  const branch = opts.branch
  async function rawPublic(repo, path) {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${path}`)
    if (res.status === 404) throw new Error(`not found: ${path} (${repo}@${branch})`)
    if (!res.ok) throw new Error(`${res.status} fetching ${path}`)
    return res.text()
  }
  async function apiPrivate(repo, path, itemName) {
    const token = requireToken(opts, itemName)
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.raw+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "koalaui-cli",
      },
    })
    if (res.status === 401 || res.status === 403)
      fail(
        `access denied (${res.status}) for ${c.bold("PRO")} item "${itemName}".\n` +
          `  Your token can't read ${repo}. Need access? → ${CONTACT}`
      )
    if (res.status === 404) throw new Error(`not found: ${path} (${repo}@${branch})`)
    if (!res.ok) throw new Error(`${res.status} fetching ${path}`)
    return res.text()
  }
  return {
    label: `${DEFAULT_PUBLIC_REPO}@${branch}`,
    async meta() {
      // the catalog lives in the public repo - no token required to browse
      return JSON.parse(await rawPublic(DEFAULT_PUBLIC_REPO, "registry.json"))
    },
    async freeFile(path) {
      return rawPublic(DEFAULT_PUBLIC_REPO, path)
    },
    async fetch(item, path) {
      return item.tier === "pro" ? apiPrivate(item.repo, path, item.name) : rawPublic(item.repo, path)
    },
  }
}

// ── target path resolution (handles src/ layouts) ────────────────────────────
function makeWriter(root, overwrite) {
  const useSrc =
    existsSync(join(root, "src")) && !existsSync(join(root, "app")) && !existsSync(join(root, "components"))
  const written = []
  const skipped = []
  const resolve = (target) => (useSrc ? join(root, "src", target) : join(root, target))
  function write(target, content) {
    const abs = resolve(target)
    if (existsSync(abs) && !overwrite) {
      skipped.push(target)
      return
    }
    mkdirSync(dirname(abs), { recursive: true })
    writeFileSync(abs, content)
    written.push(target)
  }
  return { write, written, skipped, useSrc }
}

// ── package manager detection + install ──────────────────────────────────────
function detectPM(root) {
  if (existsSync(join(root, "bun.lockb")) || existsSync(join(root, "bun.lock"))) return "bun"
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm"
  if (existsSync(join(root, "yarn.lock"))) return "yarn"
  return "npm"
}
function installDeps(root, deps) {
  const names = Object.entries(deps).map(([n, v]) => (v && v !== "latest" ? `${n}@${v}` : n))
  if (!names.length) return
  const pm = detectPM(root)
  const verb = pm === "npm" ? "install" : "add"
  info(`${pm} ${verb} ${names.join(" ")}`)
  const quoted = names.map((n) => `"${n}"`).join(" ")
  execSync(`${pm} ${verb} ${quoted}`, { cwd: root, stdio: "inherit" })
}

// ── commands ─────────────────────────────────────────────────────────────────
async function cmdList(reg) {
  const m = await reg.meta()
  const free = m.items.filter((i) => i.type !== "lib" && i.tier === "free")
  const pro = m.items.filter((i) => i.tier === "pro")
  log(c.bold(`\nKoala UI ${c.dim(`(${reg.label})`)}\n`))
  log(c.bold(`Free ${c.dim(`(${free.length})`)}`))
  for (const i of free) log(`  ${i.name}`)
  if (pro.length) {
    log(c.bold(`\nPRO ${c.dim(`(${pro.length}, requires access)`)} 🔒`))
    for (const i of pro) log(`  ${i.name} ${c.dim(i.type)}`)
  }
  log(`\n${c.dim("Add with:")} koalaui add <item...>\n`)
}

async function cmdInit(reg, opts) {
  const root = opts.cwd
  log(c.bold(`\nKoala UI - init ${c.dim(`(${reg.label})`)}\n`))
  const m = await reg.meta()
  const spec = m.init
  const w = makeWriter(root, opts.overwrite)

  const globals = await reg.freeFile(spec.cssFrom)
  w.write(spec.cssTarget, globals.replace(/^@import\s+["']tailwindcss["'];\s*\n/m, ""))
  for (const path of spec.lib) w.write(path, await reg.freeFile(path))

  for (const t of w.written) ok(`wrote ${c.dim(t)}`)
  for (const t of w.skipped) warn(`exists, skipped ${c.dim(t)} ${c.dim("(use --overwrite)")}`)

  if (opts.install) installDeps(root, spec.dependencies)
  else info(`skipped install - deps: ${Object.keys(spec.dependencies).join(" ")}`)

  log()
  ok("init complete")
  log(`\n${c.bold("Next steps:")}`)
  log(`  1. In your global stylesheet, after ${c.cyan('@import "tailwindcss";')}, add:`)
  log(`     ${c.cyan(`@import "./koala.css";`)} ${c.dim("(adjust the path to where koala.css landed)")}`)
  log(`  2. Make sure your tsconfig has the ${c.cyan('"@/*"')} path alias.`)
  log(`  3. Add components: ${c.cyan("koalaui add button card")}\n`)
}

async function cmdAdd(reg, opts) {
  const root = opts.cwd
  const names = opts._
  if (!names.length) fail("nothing to add. Usage: koalaui add <item...>")

  const m = await reg.meta()
  const byName = new Map(m.items.map((i) => [i.name, i]))

  const resolved = new Map()
  const missing = []
  function resolve(name) {
    if (resolved.has(name)) return
    const item = byName.get(name)
    if (!item) {
      missing.push(name)
      return
    }
    resolved.set(name, item)
    for (const dep of item.registryDependencies || []) resolve(dep)
    for (const dep of item.libDependencies || []) resolve(dep)
  }
  for (const n of names) resolve(n)
  if (missing.length)
    fail(`unknown item(s): ${missing.join(", ")}\n  Run ${c.cyan("koalaui list")} to see what's available.`)

  const involvesPro = [...resolved.values()].some((i) => i.tier === "pro")
  log(c.bold(`\nKoala UI - adding ${names.join(", ")} ${c.dim(`(${reg.label})`)}\n`))
  if (involvesPro) info(`includes ${c.bold("PRO")} content 🔒 - using your repo access`)
  const extra = [...resolved.keys()].filter((n) => !names.includes(n))
  if (extra.length) info(`pulling dependencies: ${c.dim(extra.join(", "))}`)

  // fetch every file (each from its own tier's source) in parallel
  const w = makeWriter(root, opts.overwrite)
  const deps = {}
  const jobs = []
  for (const item of resolved.values()) {
    Object.assign(deps, item.dependencies || {})
    for (const p of item.files) jobs.push({ item, path: p })
  }
  const contents = await Promise.all(jobs.map((j) => reg.fetch(j.item, j.path)))
  jobs.forEach((j, i) => w.write(j.path, contents[i]))

  for (const t of w.written) ok(`wrote ${c.dim(t)}`)
  for (const t of w.skipped) warn(`exists, skipped ${c.dim(t)} ${c.dim("(use --overwrite)")}`)

  if (opts.install) installDeps(root, deps)
  else if (Object.keys(deps).length) info(`skipped install - deps: ${Object.keys(deps).join(" ")}`)

  log()
  ok(`added ${names.join(", ")}`)
  if (w.useSrc) info("detected a src/ layout - files were written under src/")
  log()
}

function help() {
  log(`
${c.bold("koalaui")} - add Koala UI components & sections to your project

${c.bold("Usage")}
  koalaui init                 set up tokens, core lib helpers and base deps
  koalaui add <item...>        copy items (and their deps) into your project
  koalaui list                 list available items (free + pro)

${c.bold("Tiers")}  free = no auth · PRO = needs repo access (a GitHub token):
  $KOALAUI_TOKEN › $GH_TOKEN › $GITHUB_TOKEN › ${c.cyan("gh auth token")}

${c.bold("Options")}
  --cwd <dir>        target project root (default: cwd)
  --registry <dir>   read FREE files from a local checkout (dev)
  --pro <dir>        read PRO files from a local checkout (dev; default ../koala-ui-pro)
  --branch <b>       branch (default: ${DEFAULT_BRANCH})
  --token <t>        GitHub token (overrides env / gh)
  --overwrite        overwrite existing files
  --no-install       write files but don't run the package manager
  -h, --help         show this help
`)
}

// ── entry ─────────────────────────────────────────────────────────────────────
async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const cmd = opts._.shift()
  if (opts.help || !cmd || cmd === "help") return help()
  try {
    const reg = makeRegistry(opts)
    if (cmd === "list") return await cmdList(reg)
    if (cmd === "init") return await cmdInit(reg, opts)
    if (cmd === "add") return await cmdAdd(reg, opts)
    fail(`unknown command: ${cmd}\n  Run ${c.cyan("koalaui --help")}.`)
  } catch (err) {
    log(`${c.red("✗")} ${err && err.message ? err.message : String(err)}`)
    process.exitCode = 1
  }
}

main()
