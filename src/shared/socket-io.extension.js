import io from 'socket.io-client'
const isDev = process.env.NODE_ENV === 'development';

export const socket = isDev ? io('localhost:3000'): io();

//TODO: add more reusable of socket.io