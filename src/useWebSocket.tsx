import { useEffect, useRef, useState } from 'react'

export const useWebSocket = (
  serverUrl: string,
  userId: string,
  onLoad: (video: string) => void,
  onPlay: () => void,
  onPause: () => void,
) => {
  const [users, setUsers] = useState<string[]>([])
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    const socket = socketRef.current = new WebSocket(serverUrl)

    socket.addEventListener('open', () => {
      console.log('socket opened')
      socket.send(JSON.stringify({
        action: 'join',
        userId,
      }))
    })
  }, [])

  useEffect(() => {
    const eventListener = (message: MessageEvent) => {
      const messageData = JSON.parse(message.data)

      console.log('server message', messageData)

      if (messageData.action === 'join') {
        setUsers(users => [...users, messageData.userId])
      } else if (messageData.action === 'leave') {
        setUsers(users => users.filter(_ => _ !== messageData.userId))
      } else if (messageData.action === 'partyState') {
        setUsers(messageData.users)
        onLoad(messageData.videoId)
        if (messageData.videoPlaybackStatus === 'playing') {
          onPlay()
        }
      } else if (messageData.action === 'load') {
        onLoad(messageData.videoId)
      } else if (messageData.action === 'play') {
        onPlay()
      } else if (messageData.action === 'pause') {
        onPause()
      } else {
        console.warn('Received unknown message', messageData)
      }
    }

    socketRef.current?.addEventListener('message', eventListener)

    return () => socketRef.current?.removeEventListener('message', eventListener)
  }, [onLoad, onPlay, onPause])

  const send = (what: any) => {
    socketRef.current?.send(JSON.stringify(what))
  }

  return { users, send }
}
