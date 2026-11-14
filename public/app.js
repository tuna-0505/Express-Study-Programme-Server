const buttons = document.querySelectorAll('.button-grid button');
const statusCodeEl = document.getElementById('statusCode');
const responseBodyEl = document.getElementById('responseBody');

async function callEndpoint(method, url) {
  statusCodeEl.textContent = 'Loading...';
  responseBodyEl.textContent = '';

  try {
    const response = await fetch(url, { method });
    statusCodeEl.textContent = `${response.status} ${response.statusText}`;

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const jsonData = await response.json();
      responseBodyEl.textContent = JSON.stringify(jsonData, null, 2);
    } else {
      const textData = await response.text();
      responseBodyEl.textContent = textData;
    }
  } catch (error) {
    statusCodeEl.textContent = 'Network Error';
    responseBodyEl.textContent = `Request failed: ${error.message}`;
  }
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const method = btn.getAttribute('data-method');
    const url = btn.getAttribute('data-url');
    callEndpoint(method, url);
  });
});
