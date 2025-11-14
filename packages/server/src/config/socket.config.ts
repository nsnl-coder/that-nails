import { SOCKET_EVENT } from '@thatnails/shared';
import { Server } from 'socket.io';
import server from './server.config';

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('new connection');

  socket.on(SOCKET_EVENT.CHECKIN_CREATED, (msg) => {
    console.log('Got message:', msg);
  });
});

export default io;
