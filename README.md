# React URL Downloader

This project provides a simple React-based interface to download a file from a given URL directly to your computer.

## Structure

- `client/` – Minimal React frontend that fetches the file and lets the browser download it.
- `server/` – (Optional) Express server used in the original version to download files on the server.

## Usage

1. In `server/` run `npm install` and `npm start` to launch the proxy server.
2. Serve the client (for example using `serve` or any static server) and open `client/index.html` in your browser.
3. Enter the URL to download and click **Download**. Your browser will ask for a location to save the file.

The client always downloads files through the Node server's `/proxy` endpoint. This works even when the target server does not send CORS headers. The Express server already enables `CORS` with `origin: '*'`, so it can be accessed from any site.

If you run the proxy on a different host or port, edit `client/app.jsx` to point to that server. When the proxy cannot reach a remote file (for example due to network restrictions) the app will show the error returned by the server.

The provided Express server already enables `CORS` with `origin: '*'`, which allows requests from any site. Use it as a proxy if the remote host does not send the proper headers.

When running the server, it reads the `PORT` value from a `.env` file if present, defaulting to `5000`.
