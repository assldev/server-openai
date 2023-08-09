const http = require('http');
const routes = require('./routes.js');

const port = process.env.OPENAI_WRAPPER_PORT || 3000;
const server = http.createServer(routes.requestHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});