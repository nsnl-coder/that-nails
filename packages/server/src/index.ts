import app from './config/app.config';
import { APP_PORT } from './config/env.config';

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
