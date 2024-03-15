// app.js

const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const url = new URL(`http://${request.headers.host}${request.url}`);
  
  switch (url.pathname) {
    case '/':
      if (request.method === 'GET') {
        const name = url.searchParams.get('name') || 'Guest';
        response.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('index.html').pipe(response);
      }
      break;
    default:
      response.writeHead(404, { 'Content-Type': 'text/html' });
      fs.createReadStream('404.html').pipe(response);
  }
});

server.listen(4001, () => {
  console.log(`Server is listening at port ${server.address().port}`);
});