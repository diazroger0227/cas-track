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
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log('Validating email:', data.email); // 打印 email 地址
  if (!data.email || !validEmail.test(data.email)) {
      console.log('Email validation failed');
      return false;
  }
  console.log('Email validation passed');
  return true;
}

async function submitForm(event) {
  event.preventDefault(); // 防止表单默认提交
  const errorEl = document.querySelector('#form-error');
  errorEl.textContent = '';
  errorEl.style.display = 'none';

  // 获取表单数据
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  console.log('Form data:', data);  // 添加日志，检查数据
  data.list = params.list; // 添加 Sendy list ID

  function validateForm(data) {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('Validating email:', data.email);  // 输出验证的 email
    if (!data.email || !validEmail.test(data.email)) {
        console.log('Email validation failed:', data.email);  // 如果验证失败，打印错误
        return false;
    }
    console.log('Email validation passed:', data.email);  // 如果验证通过，打印成功
    return true;
  }

  try {
      const response = await fetch('https://helloworld.diaz-roger0227.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      }).then(res => res.text());

      console.log('Server response:', response);  // 输出服务器响应

      if (response === '1') {
        window.location.href = `thankyou.html?clickid=${encodeURIComponent(params.clickid)}`;
      } else {
          errorEl.textContent = response || 'Submission failed';
          errorEl.style.display = 'block';
      }
  } catch (error) {
      console.error('Network error:', error);
      errorEl.textContent = 'Network error, please try later';
      errorEl.style.display = 'block';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', submitForm);
});