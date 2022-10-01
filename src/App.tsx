import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import { UserList } from './UserList'
import { useWebSocket } from './useWebSocket'

// const serverUrl = 'wss://nooks-takehome-backend-production.up.railway.app'
const serverUrl = process.env.REACT_APP_SERVER_URL || 'ws://localhost:8080'

// randomly generate a user ID every time you join the room
// you don't need persistence between browser reloads or different sessions,
// so a random ID will do to distinguish between two tabs with the Youtube Watch Party Open
const userId = uuidv4();

const sampleVideos = [
  'https://www.youtube.com/watch?v=kpk2tdsPh0A',
  'https://www.youtube.com/watch?v=6EKreQ5HD4w',
  'https://www.youtube.com/watch?v=qWXnt2Z2D1E',
  'https://www.youtube.com/watch?v=0f0OvgfWrFQ',
]

function App() {
  const users = useWebSocket(serverUrl, userId)

  const [videoUrl, setVideoUrl] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to the Youtube Watch Party. Your ID for this session is{" "}
          {userId}.
        </p>
        <Button> Add a youtube video</Button>
        <UserList users={users} />
      </header>
    </div>
  );
}

export default App;
