import http from 'http';
import app from './app.config';
const server = http.createServer(app);

export default server;
