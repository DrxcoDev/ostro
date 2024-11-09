// request.js
const net = require('net');
const { parseUrl } = require('./utils');

function get(url, callback) {
  const { host, port, path } = parseUrl(url);

  const client = net.createConnection({ host, port }, () => {
    const request = `GET ${path} HTTP/1.1\r\nHost: ${host}\r\nConnection: close\r\n\r\n`;
    client.write(request);
  });

  let data = '';

  client.on('data', (chunk) => {
    data += chunk;
  });

  client.on('end', () => {
    const [, body] = data.split('\r\n\r\n');
    callback(null, body);
  });

  client.on('error', (error) => {
    callback(error, null);
  });
}

function post(url, body, callback) {
  const { host, port, path } = parseUrl(url);
  const bodyData = JSON.stringify(body);
  const request = `POST ${path} HTTP/1.1\r\nHost: ${host}\r\nContent-Length: ${Buffer.byteLength(bodyData)}\r\nContent-Type: application/json\r\nConnection: close\r\n\r\n${bodyData}`;

  const client = net.createConnection({ host, port }, () => {
    client.write(request);
  });

  let data = '';

  client.on('data', (chunk) => {
    data += chunk;
  });

  client.on('end', () => {
    const [, responseBody] = data.split('\r\n\r\n');
    callback(null, responseBody);
  });

  client.on('error', (error) => {
    callback(error, null);
  });
}

module.exports = { get, post };
