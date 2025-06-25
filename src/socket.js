// src/socket.js
import { io } from 'socket.io-client';
import { BASE_URL } from './api/axios';

// const socket = io('http://localhost:3000', {
//   withCredentials: true,
//   transports: ['websocket'],
// });

const socket = io(BASE_URL, {
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;
