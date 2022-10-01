import { useEffect, useState } from 'react'

export const useWebSocket = (serverUrl: string, userId: string) => {
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

  return users
}
