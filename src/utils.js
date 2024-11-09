// utils.js
const { URL } = require('url');

// Analizar la URL para obtener los componentes de host, puerto y ruta
function parseUrl(url) {
  // Verificamos si la URL ya tiene el esquema (http:// o https://), si no, lo agregamos
  const fullUrl = url.startsWith('http') ? url : `http://${url}`;

  const parsedUrl = new URL(fullUrl);

  return {
    host: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),  // Usar puerto de la URL o 8080 si no se indica
    path: parsedUrl.pathname + parsedUrl.search,  // Incluye también la búsqueda (query string)
  };
}

module.exports = { parseUrl };
