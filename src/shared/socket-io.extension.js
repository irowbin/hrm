import io from 'socket.io-client'

export const socket = io('http://localhost:3000');

//TODO: add more reusable of socket.io