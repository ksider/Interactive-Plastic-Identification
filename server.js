const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 3000;

const publicDir = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const resolvePath = (requestPath) => {
  try {
    const decodedPath = decodeURI(requestPath.split('?')[0]);
    const safePath = decodedPath === '/' ? '/index.html' : decodedPath;
    const absolutePath = path.join(publicDir, safePath);

    if (!absolutePath.startsWith(publicDir)) {
      return null;
    }

    return absolutePath;
  } catch {
    return null;
  }
};

const serveFile = async (filePath) => {
  const stats = await fs.stat(filePath);

  if (stats.isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    return serveFile(indexPath);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const body = await fs.readFile(filePath);

  return { body, contentType };
};

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url || '/');

  if (!filePath) {
    res.writeHead(400).end('Bad Request');
    return;
  }

  serveFile(filePath)
    .then(({ body, contentType }) => {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      });
      res.end(body);
    })
    .catch((error) => {
      if (error.code === 'ENOENT') {
        res.writeHead(404).end('Not Found');
      } else {
        res.writeHead(500).end('Server Error');
      }
    });
});

server.listen(PORT, HOST, () => {
  console.log(`Polymer map available at http://${HOST}:${PORT}`);
});
