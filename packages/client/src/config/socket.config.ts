import { io } from 'socket.io-client';
import { SOCKET_BASE_URL } from './env.config';

const socket = io(SOCKET_BASE_URL);
export default socket;
