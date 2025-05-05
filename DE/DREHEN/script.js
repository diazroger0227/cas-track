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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', async (event) => {
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

    const clickid = localStorage.getItem('clickid') || 'default_clickid';
    const isValidClickid = /^[a-zA-Z0-9_-]+$/.test(clickid);
    const safeClickid = isValidClickid ? clickid : 'default_clickid';

    // ✅ 同步预打开 offer 页，避免被拦截
    const offerWindow = window.open('', '_blank', 'noopener');

    try {
      const response = await fetch('https://helloworld.diaz-roger0227.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // ✅ 先设置 offer 页跳转地址
        offerWindow.location.href = `https://luckystarisyou.store/chv3l3k.php?lp=1`;

        // ✅ 当前页跳转到 thank you 页面
        window.location.href = `thankyou.html?clickid=${encodeURIComponent(safeClickid)}`;
      } else {
        console.error('Submission failed:', response.statusText);
        errorEl.textContent = `Submission failed: ${response.statusText}`;
        errorEl.style.display = 'block';
        // 如果失败，关闭提前打开的空页
        offerWindow.close();
      }
    } catch (error) {
      console.error('Network error:', error);
      errorEl.textContent = 'Network error, please try again later';
      errorEl.style.display = 'block';
      offerWindow.close();
    }
  });
});
