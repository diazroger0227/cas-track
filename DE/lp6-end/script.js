// 从着陆页 URL 获取查询参数。我们将 tracker 的 clickid 传递到着陆页，
// 当表单成功提交时，我们需要将其传递到感谢页面。
//
// 查询参数对象会记录到控制台，以供调试。
const parseParams = (querystring) => {
    const params = new URLSearchParams(querystring);
    const obj = {};
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key);
      } else {
        obj[key] = params.get(key);
      }
    }
    return obj;
  };
  const params = parseParams(window.location.search);
  console.log('URL query params:', params);
  
  
  // 进行一些基础验证的函数：
// -- 名字：检查名字是否填写（即长度大于 0）
// -- 电子邮件：检查电子邮件是否格式正确（即包含 '@' 并跟着一个有效的 URL）
  function validateForm(data) {
    var validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (data.name.length > 0 && validEmail.test(data.email)) {
      console.log('✅  Form is valid!');
      return true;
    } else {
      console.log('❌  Form is invalid!');
      return false;
    }
  }
  
  // 这个函数重写了 HTML 表单的默认行为，使用 'validateForm' 函数进行验证，
// 如果有效，就将表单提交到我们的虚拟 API URL。如果服务器接受请求，浏览器会重定向到感谢页面并带上用户的 clickid（我们将使用这个来触发感谢页面上的自定义转换）。
//
// 如果表单数据未通过验证，表单将显示一个错误信息，说明 '请正确填写所有字段'。
// 根据需要调整文字并添加特定的错误信息。
//
// 由于这是一个演示，虚拟 API 始终返回以下响应：
// 
// {
//    "status": 200,
//    "success": "yes"
// }
//
// 如果这是一个真实的 API，响应可能会有所不同，如果服务器不接受提交，
// 将会通过 else 块捕获... '❌ 提交失败!'
  async function submitForm(event) {
      // Override the default behavior of the HTML form
    event.preventDefault();
  // Clear the error message if it's already there from a failed submission
    document.querySelector('#form-error').innerHTML = '';
    document.querySelector('#form-error').style.display = 'none';
  // Create an object with the form data
    const userInputs = new FormData(event.target);
    const data = Object.fromEntries(userInputs.entries());
    data.list = params.list; 
    console.log('Data to submit in form:', data);
  // 如果表单数据有效，则执行 POST 请求到我的虚拟 API
  if (validateForm(data)) {
      const request = await fetch('https://helloworld.diaz-roger0227.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const response = await request.text();
      console.log('Submission response:', response);
  // 如果响应状态为 200，表单有效
  if (response.=== '1') {
        console.log('✅  Success!');
        window.location.replace(`/form/thanks/index.html?clickid=${params.clickid}`);
  // 如果响应状态不是 200，表单未被接受并将显示返回的错误信息
} else {
        console.log('❌  Submission failed!');
        document.querySelector('#form-error').innerHTML = response.error;
        document.querySelector('#form-error').style.display = 'block';
      }
  // 如果 'name' 和 'email' 字段没有通过 'validateForm' 函数的验证，则出现错误
} else {
      document.querySelector('#form-error').innerHTML = 'Please fill in all fields correctly';
      document.querySelector('#form-error').style.display = 'block';
    }
  }
  
  // 当页面加载时，添加一个事件监听器，将 'submitForm' 函数绑定到表单的按钮
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', submitForm);
  });