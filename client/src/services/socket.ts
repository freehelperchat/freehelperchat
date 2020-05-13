import socketio from 'socket.io-client';
import { baseURL } from './api';

const socket = socketio(baseURL);

export default socket;
