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

  const offerWindow = window.open('about:blank', '_blank'); // 开新标签

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  data.list = params.list;

  const clickid = localStorage.getItem('clickid') || 'default_clickid';
  const isValidClickid = /^[a-zA-Z0-9_-]+$/.test(clickid);
  const safeClickid = isValidClickid ? clickid : 'default_clickid';

  if (!params.list || typeof params.list !== 'string') {
    errorEl.textContent = 'Invalid list parameter';
    errorEl.style.display = 'block';
    offerWindow.close(); // 清理空白标签页
    return;
  }

  if (!validateForm(data)) {
    errorEl.textContent = 'Please fill in a valid email';
    errorEl.style.display = 'block';
    offerWindow.close();
    return;
  }

  try {
    const response = await fetch('https://helloworld.diaz-roger0227.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // 设置 offer 页的 URL
      offerWindow.location.href = `https://luckystarisyou.store/chv3l3k.php?lp=1`;
      
      setTimeout(() => {
        window.location.replace(`thankyou.html?clickid=${encodeURIComponent(safeClickid)}`);

      }, 100); 
      
         
    } else {
      errorEl.textContent = `Submission failed: ${response.statusText}`;
      errorEl.style.display = 'block';
      offerWindow.close();
    }
  } catch (error) {
    errorEl.textContent = 'Network error, please try again later';
    errorEl.style.display = 'block';
    offerWindow.close();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', submitForm);
});
