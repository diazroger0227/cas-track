
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
console.log('Query string:', window.location.search);
const params = parseParams(window.location.search);
console.log('URL query params:', params);



function validateForm(data) {
  var validEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ( validEmail.test(data.email)) {
    console.log('✅  Form is valid!');
    return true;
  } else {
    console.log('❌  Form is invalid!');
    return false;
  }
}


async function submitForm(event) {
   
  
  event.preventDefault();
  document.querySelector('#form-error').innerHTML = '';
  document.querySelector('#form-error').style.display = 'none';

  const userInputs = new FormData(event.target);
  const data = Object.fromEntries(userInputs.entries());
  data.list = params.list;
  console.log('Data to submit in form:', data);

  if (validateForm(data)) {
   /*  const request = await fetch('https://helloworld.diaz-roger0227.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const response = await request.text(); */
    const response = '1';
    
    if (response === '1') {
      console.log('✅  Success!');
      window.open('https://luckystarisyou.store/chv3l3k.php?lp=1');
      
      window.location.replace(`ThankYou.html?clickid=${params.clickid}`);
     

    } else {
      console.log('❌  Submission failed!');
      document.querySelector('#form-error').innerHTML = 'Please fill in all fields correctly';
      document.querySelector('#form-error').style.display = 'block';
    }

  } else {
    document.querySelector('#form-error').innerHTML = 'Please fill in all fields correctly';
    document.querySelector('#form-error').style.display = 'block';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', submitForm);
});