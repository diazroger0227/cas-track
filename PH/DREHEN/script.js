const parseParams = (querystring) => {
  const params = new URLSearchParams(querystring);
  const obj = {};
  for (const key of params.keys()) {
    obj[key] = params.getAll(key).length > 1 ? params.getAll(key) : params.get(key);
  }
  return obj;
};

const params = parseParams(window.location.search);
console.log('URL params:', params);

function validateForm(data) {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log('Validating email:', data.email);
  if (!data.email || !validEmail.test(data.email)) {
    console.warn('Email validation failed');
    return false;
  }
  console.log('Email validation passed');
  return true;
}

async function submitForm(event) {
  console.log('Form submitted');
  event.preventDefault();
  const errorEl = document.querySelector('#form-error');
  errorEl.textContent = '';
  errorEl.style.display = 'none';

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  data.list = params.list;

  if (!params.list || typeof params.list !== 'string') {
    console.error('Invalid list parameter');
    errorEl.textContent = 'Invalid list parameter';
    errorEl.style.display = 'block';
    return;
  }

  if (!validateForm(data)) {
    errorEl.textContent = 'Please fill in a valid email';
    errorEl.style.display = 'block';
    errorEl.focus();
    return;
  }

  try {
    const response = await fetch('https://helloworld.diaz-roger0227.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Redirecting to thank you page');
      window.location.replace(`thankyou.html?clickid=${encodeURIComponent(params.clickid)}`);
    } else {
      console.error('Submission failed:', response.statusText);
      errorEl.textContent = `Submission failed: ${response.statusText}`;
      errorEl.style.display = 'block';
    }
  } catch (error) {
    console.error('Network error:', error);
    errorEl.textContent = 'Network error, please try again later';
    errorEl.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', submitForm);
});