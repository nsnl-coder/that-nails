import { Server } from 'socket.io';

// what is type of io
const getIO = (): Server => {
  const io = require('../config/app.config');
  return io;
};

export default getIO;
