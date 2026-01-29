import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 3000;

app.get('/', (req, res, next) => {
  const targetUrl = req.query.url;
 
  if (!targetUrl) {
    return res.status(400).send('Mohon sertakan query ?url=');
  }
 
  // Membuat proxy middleware secara dinamis
  const proxy = createProxyMiddleware({
    target: `https://${targetUrl}`,
    changeOrigin: true,
  });
 
  return proxy(req, res, next);
});
 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});