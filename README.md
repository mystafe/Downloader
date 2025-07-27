# React URL Downloader

This project provides a simple React-based interface to download a file from a given URL to a specific location on the server.

## Structure

- `server/` – Express server that performs the actual download.
- `client/` – Minimal React frontend that sends the download request.

## Usage

1. Install server dependencies:
   ```bash
   cd server && npm install
   npm start
   ```
2. Serve the client (for example using `serve` or any static server) and open `client/index.html` in your browser.
3. Enter the URL to download and the path where the file should be saved on the server.

Ensure the server has permission to write to the specified path.
