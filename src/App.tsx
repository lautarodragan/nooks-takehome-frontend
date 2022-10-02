import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube'
import { v4 as uuidv4 } from "uuid";

import { UserList } from './UserList'
import { useWebSocket } from './useWebSocket'
import { YouTubeURLInput } from './YouTubeURLInput'

const serverUrl = process.env.REACT_APP_SERVER_URL || 'ws://localhost:8080'

// randomly generate a user ID every time you join the room
// you don't need persistence between browser reloads or different sessions,
// so a random ID will do to distinguish between two tabs with the Youtube Watch Party Open
const userId = uuidv4();

function App() {
  const users = useWebSocket(serverUrl, userId)

  const [videoId, setVideoId] = useState('')

  const onUrlSubmit = (videoId: string) => {
    console.log('submitted videoId', videoId)
    setVideoId(videoId)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to the Youtube Watch Party. Your ID for this session is{" "}
          {userId}.
        </p>
        <Button> Add a youtube video</Button>
        <YouTubeURLInput onSubmit={onUrlSubmit} />

        <YouTube
          videoId={videoId}
          // onReady={func}                    // defaults -> noop
          // onPlay={func}                     // defaults -> noop
          // onPause={func}                    // defaults -> noop
          // onEnd={func}                      // defaults -> noop
          // onError={func}                    // defaults -> noop
          // onStateChange={func}              // defaults -> noop
          // onPlaybackRateChange={func}       // defaults -> noop
        />


        <UserList users={users} />
      </header>
    </div>
  );
}

export default App;
