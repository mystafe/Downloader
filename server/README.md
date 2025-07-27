# Downloader Server

Simple Express server that can either save a remote file to disk or proxy it back to the browser.

## Setup

```bash
npm install
npm start
```

Create a `.env` file to override the default port:

```bash
PORT=3000
```

The server listens on port `5000` if no `PORT` is specified.

### Proxy endpoint

`GET /proxy?url=<fileUrl>`

Fetches the file at `fileUrl` and streams it back to the client. Use this when the remote server does not allow CORS.

The server responds with a JSON error if it cannot reach the requested URL (for example, when the target host is blocked).
