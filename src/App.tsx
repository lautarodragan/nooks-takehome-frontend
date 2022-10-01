import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import { UserList } from './UserList'

// const serverUrl = 'wss://nooks-takehome-backend-production.up.railway.app'
const serverUrl = process.env.REACT_APP_SERVER_URL || 'ws://localhost:8080'

// randomly generate a user ID every time you join the room
// you don't need persistence between browser reloads or different sessions,
// so a random ID will do to distinguish between two tabs with the Youtube Watch Party Open
const userId = uuidv4();

function App() {
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    const socket = new WebSocket(serverUrl)

    socket.addEventListener('open', () => {
      console.log('socket opened')
      socket.send(JSON.stringify({
        action: 'join',
        userId,
      }))
    })

    socket.addEventListener('message', (message) => {
      const messageData = JSON.parse(message.data)

      console.log('server message', messageData)

      if (messageData.action === 'join') {
        setUsers(users => [...users, messageData.userId])
      } else if (messageData.action === 'leave') {
        setUsers(users => users.filter(_ => _ !== messageData.userId))
      } else if (messageData.action === 'userList') {
        setUsers(messageData.users)
      } else {
        console.log('unknown message', messageData)
      }
    })
  }, [])

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
