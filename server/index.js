const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Allow requests from any origin so the downloader can be used cross-site
app.use(cors({ origin: '*' }));
app.use(express.json());

// Proxy endpoint to work around remote servers that do not send CORS headers
app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'url query parameter required' });
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).end();
    }
    res.setHeader(
      'Content-Type',
      response.headers.get('content-type') || 'application/octet-stream'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${path.basename(url)}"`
    );
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/download', async (req, res) => {
  const { url, savePath } = req.body;
  if (!url || !savePath) {
    return res.status(400).json({ error: 'url and savePath are required' });
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    const dest = fs.createWriteStream(savePath);
    await new Promise((resolve, reject) => {
      response.body.pipe(dest);
      response.body.on('error', reject);
      dest.on('finish', resolve);
    });
    res.json({ message: 'File downloaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
