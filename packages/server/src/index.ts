import { APP_PORT } from './config/env.config';
import './config/migrator.config';
import server from './config/server.config';
import { initializeSocket } from './config/socket.config';

// Initialize socket.io after server is created
initializeSocket(server);

server.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
