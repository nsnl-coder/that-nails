import { SOCKET_EVENT } from '@thatnails/shared';
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server | null = null;

export const initializeSocket = (server: HttpServer) => {
  if (io) {
    return io;
  }

  io = new Server(server, {
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

  return io;
};

export const getIo = (): Server => {
  if (!io) {
    throw new Error(
      'Socket.io has not been initialized. Call initializeSocket first.',
    );
  }
  return io;
};

export default getIo;
