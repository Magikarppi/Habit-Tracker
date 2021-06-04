import app = require('./app');
const http = require('http');

const server = http.createServer(app);

server.listen(process.env.PORT || 3003, () => {
  console.log(`Server running`);
});
