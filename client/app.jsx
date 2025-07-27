function App() {
  const [url, setUrl] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const handleDownload = async () => {
    setMessage('');
    setIsError(false);
    try {
      // Use the local server as a proxy so downloads work even when the remote host blocks CORS
      const res = await fetch(
        `http://localhost:5000/proxy?url=${encodeURIComponent(url)}`
      );
      if (!res.ok) throw new Error('Failed to fetch file');
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = url.split('/').pop() || 'download';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(a.href);
      setMessage('Download started');
    } catch (err) {
      setIsError(true);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setMessage(
          'Failed to fetch file. The server might not allow cross-origin requests.'
        );
      } else {
        setMessage(err.message);
      }
    }
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1 className="mb-4">URL Downloader</h1>
      <div className="mb-3">
        <label className="form-label">URL</label>
        <input
          type="text"
          className="form-control"
          placeholder="https://example.com/file.zip"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleDownload}>Download</button>
      {message && (
        <div
          className={`alert ${isError ? 'alert-danger' : 'alert-success'} mt-3`}
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
