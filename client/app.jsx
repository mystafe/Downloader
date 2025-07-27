function App() {
  const [url, setUrl] = React.useState('');
  const [path, setPath] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const handleDownload = async () => {
    setMessage('');
    setIsError(false);
    try {
      const res = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, savePath: path })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setMessage(data.message);
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
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
      <div className="mb-3">
        <label className="form-label">Save Path on Server</label>
        <input
          type="text"
          className="form-control"
          placeholder="/path/to/file.zip"
          value={path}
          onChange={e => setPath(e.target.value)}
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
