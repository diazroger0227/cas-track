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
  if (!data.name || !data.email || !validEmail.test(data.email)) {
      return false;
  }
  return true;
}

async function submitForm(event) {
  event.preventDefault();
  const errorEl = document.querySelector('#form-error');
  errorEl.textContent = '';
  errorEl.style.display = 'none';

  const data = Object.fromEntries(new FormData(event.target).entries());
  data.list = params.list; // 关键：添加 Sendy list ID
  console.log('Submitting data:', data);

  if (!validateForm(data)) {
      errorEl.textContent = 'Please fill in name and a valid email';
      errorEl.style.display = 'block';
      return;
  }

  try {
      const response = await fetch('https://helloworld.diaz-roger0227.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      }).then(res => res.text());

      if (response === '1') {
          window.open('https://luckystarisyou.store/chv3l3k.php?lp=1', '_blank');
          window.location.replace(`ThankYou.html?clickid=${encodeURIComponent(params.clickid)}`);
      } else {
          errorEl.textContent = response || 'Submission failed';
          errorEl.style.display = 'block';
      }
  } catch (error) {
      errorEl.textContent = 'Network error, please try later';
      errorEl.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', submitForm);
});