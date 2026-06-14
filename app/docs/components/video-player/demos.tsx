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

// A short, openly-hosted clip so the docs demo plays without any project assets.
const SRC = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
const POSTER =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"

/** The default player — minimal, single-row chrome, the way it ships. */
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
 * hovering the scrubber reads out the time you'd land on — no need to play first.
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

/** Even barer — just play, scrubber, and time. Compose only the parts you need. */
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
