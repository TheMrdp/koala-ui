"use client"

import {
  VideoPlayer,
  Video,
  VideoControls,
  VideoBar,
  VideoPlayButton,
  VideoSeek,
  VideoTime,
  VideoVolume,
  VideoFullscreen,
  VideoSpinner,
} from "@/components/ui/video-player"

// A short, openly-hosted clip so the docs demo plays without any project assets. W3C's own
// media host (the canonical HTML5 sample, has audio so the volume control is meaningful) — the
// old Google `gtv-videos-bucket` sample was locked down and now 403s.
const SRC = "https://media.w3.org/2010/05/sintel/trailer.mp4"
const POSTER = "https://media.w3.org/2010/05/sintel/poster.png"

/** The default player: minimal, single-row chrome, the way it ships. */
export function VideoPlayerDemo() {
  return (
    <div className="w-full max-w-2xl">
      <VideoPlayer>
        <Video src={SRC} poster={POSTER} preload="metadata" />
        <VideoSpinner />
        <VideoControls>
          <VideoBar>
            <VideoPlayButton />
            <VideoSeek />
            <VideoTime />
            <VideoVolume />
            <VideoFullscreen />
          </VideoBar>
        </VideoControls>
      </VideoPlayer>
    </div>
  )
}

/**
 * Showcases the scrub preview: with `preload="metadata"` the duration is known up front, so
 * hovering the scrubber reads out the time you'd land on, with no need to play first.
 */
export function VideoPlayerSeekPreviewDemo() {
  return (
    <div className="w-full max-w-2xl">
      <VideoPlayer>
        <Video src={SRC} poster={POSTER} preload="metadata" />
        <VideoSpinner />
        <VideoControls>
          <VideoBar>
            <VideoPlayButton />
            <VideoSeek />
            <VideoTime />
            <VideoVolume />
            <VideoFullscreen />
          </VideoBar>
        </VideoControls>
      </VideoPlayer>
    </div>
  )
}

/** Even barer: just play, scrubber, and time. Compose only the parts you need. */
export function VideoPlayerMinimalDemo() {
  return (
    <div className="w-full max-w-2xl">
      <VideoPlayer>
        <Video src={SRC} poster={POSTER} preload="metadata" />
        <VideoControls>
          <VideoBar>
            <VideoPlayButton />
            <VideoSeek />
            <VideoTime />
          </VideoBar>
        </VideoControls>
      </VideoPlayer>
    </div>
  )
}

/**
 * The cinematic treatment: `revealOn="hover"` keeps the chrome hidden until you point at the
 * player (or tab into it), paused or playing alike. Paired with `autoPlay`, `loop`, and
 * `muted` it reads as an ambient product loop, mute and zoom (fullscreen) one hover away.
 */
export function VideoPlayerHoverDemo() {
  return (
    <div className="w-full max-w-2xl">
      <VideoPlayer revealOn="hover">
        <Video src={SRC} poster={POSTER} autoPlay loop muted preload="auto" />
        <VideoSpinner />
        <VideoControls>
          <VideoBar>
            <VideoPlayButton />
            <VideoSeek />
            <VideoTime />
            <VideoVolume />
            <VideoFullscreen />
          </VideoBar>
        </VideoControls>
      </VideoPlayer>
    </div>
  )
}
