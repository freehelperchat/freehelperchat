const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./server/routes');

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use('/chat', express.static(path.join(`${__dirname}/client/build`)));

app.get('/chat', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
