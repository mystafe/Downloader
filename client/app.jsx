function App() {
  const [url, setUrl] = React.useState('');
  const [path, setPath] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleDownload = async () => {
    setMessage('');
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
      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>URL Downloader</h1>
      <div>
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Save Path"
          value={path}
          onChange={e => setPath(e.target.value)}
          style={{ width: '300px', marginTop: '8px' }}
        />
      </div>
      <button onClick={handleDownload} style={{ marginTop: '8px' }}>Download</button>
      <div style={{ marginTop: '8px', color: 'green' }}>{message}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
