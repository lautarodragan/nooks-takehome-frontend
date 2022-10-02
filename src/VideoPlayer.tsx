import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube'
import React, { useRef, useImperativeHandle, forwardRef } from "react";

interface VideoPlayerProps {
  readonly videoId: string
  readonly onPlay: () => void
  readonly onPause: () => void
}

export interface VideoPlayerRef {
  readonly play: () => void
  readonly pause: () => void
}

export const VideoPlayer = forwardRef((
  { videoId, onPlay, onPause }: VideoPlayerProps,
  ref,
) => {
  const playerRef = useRef<YouTubePlayer>()

  useImperativeHandle(ref, () => ({
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
  }))

  const onVideoReady = (event: YouTubeEvent) => {
    console.log('onVideoReady', event)
    playerRef.current = event.target
  }

  const onVideoPlay = (event: YouTubeEvent) => {
    console.log('onVideoPlay', event)
  }

  const onVideoPause = (event: YouTubeEvent) => {
    console.log('onVideoPause', event)
  }

  const onVideoEnd = (event: YouTubeEvent) => {
    console.log('onVideoEnd', event)
  }

  const onVideoError = (event: YouTubeEvent) => {
    console.log('onVideoError', event)
  }

  const onVideoStateChange = (event: YouTubeEvent) => {
    console.log('onVideoStateChange', event)
  }

  const onVideoPlaybackRateChange = (event: YouTubeEvent) => {
    console.log('onVideoPlaybackRateChange', event)
  }

  const onPlayClick = () => {
    if (!playerRef.current)
      return
    playerRef.current.playVideo()
    onPlay()
  }

  const onPauseClick = () => {
    if (!playerRef.current)
      return
    playerRef.current.pauseVideo()
    onPause()
  }

  return (
    <div>
      <YouTube
        videoId={videoId}
        onReady={onVideoReady}
        onPlay={onVideoPlay}
        onPause={onVideoPause}
        onEnd={onVideoEnd}
        onError={onVideoError}
        onStateChange={onVideoStateChange}
        onPlaybackRateChange={onVideoPlaybackRateChange}
        opts={{ playerVars: { controls: 0, autoplay: 1 } }}
      />

      <button onClick={onPlayClick}>Play</button>
      <button onClick={onPauseClick}>Pause</button>

    </div>
  )
})
