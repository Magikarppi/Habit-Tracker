import app = require('./app');
import http = require('http');
import config = require('./utils/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(
    `Server running on port: ${config.PORT} in ${process.env.NODE_ENV} env`
  );
});
