// 提取URL参数（例如 clickid, campaign_id 等）
const parseParams = (querystring) => {
  const params = new URLSearchParams(querystring);
  const obj = {};
  for (const key of params.keys()) {
    obj[key] = params.getAll(key).length > 1 ? params.getAll(key) : params.get(key);
  }
  return obj;
};
const params = parseParams(window.location.search);
console.log('URL query params:', params);

// 表单提交主逻辑
async function submitForm(event) {
  event.preventDefault(); // 阻止默认表单提交跳转

  // 清除之前的错误提示
  const formError = document.getElementById('form-error');
  if (formError) {
    formError.style.display = 'none';
    formError.innerHTML = '';
  }

  // 收集用户输入的数据
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // 简单验证邮箱格式
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email)) {
    alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.'); // 提示输入正确email
    return;
  }

  try {
    // 发送POST请求到你的Cloudflare Worker
    const response = await fetch('https://verify-email-worker.diaz-roger0227.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('✅ Email verified and submitted successfully!');
      
      // 验证成功后跳转到你的Offer页面，带上必要的参数
      window.location.href = `https://luckystarisyou.store/chv3l3k.php?key=article-1&emailadd=${encodeURIComponent(data.email)}&external_id=${encodeURIComponent(params.clickid)}&payout=1.2&campaign_id=${encodeURIComponent(params.campaign_id || '')}`;

    } else {
      console.log('❌ Submission failed');
      alert('Die E-Mail-Adresse ist ungültig oder konnte nicht verifiziert werden. Bitte überprüfen Sie Ihre Eingabe.');
    }
  } catch (error) {
    console.error('❌ Error submitting form:', error);
    alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
  }
}

// 页面加载完后，把submitForm挂载到表单
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', submitForm);
});