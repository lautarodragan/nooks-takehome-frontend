import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
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
        <UserList users={users} />
      </header>
    </div>
  );
}

export default App;
