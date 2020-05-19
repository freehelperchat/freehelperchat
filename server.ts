import app from './server/app';
import config from './server/config/config.json';

const port = process.env.PORT || config.server.port;

app.listen(port, () => console.log(`Listening on port ${port}`));
