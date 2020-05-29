import app from './app';
import config from './config/config.json';

const port = process.env.PORT || config.server.port;

app.listen(port, () => console.log(`Listening on port ${port}`));
