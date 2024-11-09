const net = require('net');
const { parseUrl } = require('./utils');

function startServer(port = 8080) {
  const server = net.createServer((socket) => {
    socket.on('data', (data) => {
      const request = data.toString();
      const [requestLine] = request.split('\r\n');
      const [method, url] = requestLine.split(' ');

      // Verificar si la URL es válida
      if (!url || !url.startsWith('http')) {
        console.error('URL no válida:', url);
        socket.write('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\nURL no válida');
        socket.end();
        return;
      }

      // Extraer el host y puerto de la URL
      const { host, port, path } = parseUrl(url);
      
      let response = '';

      if (method === 'GET') {
        response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\nHola, has solicitado la ruta: ${url}`;
      } else if (method === 'POST') {
        const body = 'Este es un cuerpo de respuesta para POST';
        response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\n${body}`;
      } else {
        response = 'HTTP/1.1 405 Method Not Allowed\r\nConnection: close\r\n\r\nMétodo no permitido';
      }

      socket.write(response);
      socket.end();
    });
  });

  server.listen(port, () => {
    console.log(`Servidor HTTP iniciado en http://localhost:${port}`);
  });
}

module.exports = { startServer };
