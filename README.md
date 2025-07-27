# React URL Downloader

This project provides a simple React-based interface to download a file from a given URL directly to your computer.

## Structure

- `client/` – Minimal React frontend that fetches the file and lets the browser download it.
- `server/` – (Optional) Express server used in the original version to download files on the server.

## Usage

1. Serve the client (for example using `serve` or any static server) and open `client/index.html` in your browser.
2. Enter the URL to download and click **Download**. Your browser will ask for a location to save the file.

If the request completes in the Network tab but the app shows `Failed to fetch`, the target server likely does not permit cross-origin downloads. In that case run the Node server in `server/` or enable CORS on the remote server.

The provided Express server already enables `CORS` with `origin: '*'`, which allows requests from any site. Use it as a proxy if the remote host does not send the proper headers.

The previous server-based downloader remains in the `server/` folder if you still need that functionality.
When running the server, it reads the `PORT` value from a `.env` file if present, defaulting to `5000`.
