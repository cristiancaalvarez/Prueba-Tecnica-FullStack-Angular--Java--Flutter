// Configure CORS for web development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Add CORS headers for development
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    if (url.includes('thecatapi.com')) {
      options.mode = 'cors';
      options.headers = {
        ...options.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, x-api-key',
      };
    }
    return originalFetch(url, options);
  };
}

// Initialize Flutter web app
window.addEventListener('flutter-first-frame', function () {
  console.log('Flutter app loaded successfully');
});
