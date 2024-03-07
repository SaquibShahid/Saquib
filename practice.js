const express = require('express');
const http2 = require('http2');
const app = express();
const server = http2.createServer(app);

server.on('stream', (stream, headers) => {
  const path = headers[':path'];

  if (path === '/') {
    stream.respond({
      'status': 200,
      'content-type': 'text/plain',
    });
    stream.end('Hello from HTTP/2 server!');
  } else {
    stream.respond({
      'status': 404,
      'content-type': 'text/plain',
    });
    stream.end('Not found');
  }
});


app.get('/', (req, res) => {
    res.send("welcome to HTTP/2 server");
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});