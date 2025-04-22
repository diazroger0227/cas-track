// Gets the URL query parameters from the landing page URL. We are passing our tracker's clickid to the landing page, which we'll need to pass on to our thank you page when our form is successfully submit.
//
// The query params object is logged to the console for debugging purposes.
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
  
  
  // Function to perform some very basic validations:
  // -- Name: check if the name is filled in (i.e. the length is greater than 0)
  // -- Email: check if the email is formatted like an email should (i.e. contains '@' followed by a valid URL)
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
  
  // This function overrrides the default behaviour of an HTML form, validates the fields with our 'validateForm' function, and if valid, submits the form to our fake API URL. If the server accepts the request, the browser will redirect to the thank you page WITH the user's clickid (we'll use this to trigger a custom conversion on the thank you page).
  //
  // If the form data doesn't pass validation the form will display an error message that says 'Please fill in all fields correctly'. Adjust the wording and add specific error messages as you see fit.
  //
  // Because this is a demo, the fake API always returns the following response:
  //
  // {
  //    "status": 200,
  //    "success": "yes"
  // }
  //
  // If this was a real API the response could be different if the server doesn't accept the submission, which would be caught with the else block... '❌  Submission failed!'
  async function submitForm(event) {
      // Override the default behavior of the HTML form
    event.preventDefault();
  // Clear the error message if it's already there from a failed submission
    document.querySelector('#form-error').innerHTML = '';
    document.querySelector('#form-error').style.display = 'none';
  // Create an object with the form data
    const userInputs = new FormData(event.target);
    const data = Object.fromEntries(userInputs.entries());
    console.log('Data to submit in form:', data);
  // If the data on the form is valid, perform a POST request to my fake API
    if (validateForm(data)) {
      const request = await fetch('https://rough-sunset-2542.diaz-roger0227.workers.dev/worker.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      console.log('Submission response:', response);
  // If the response status is 200, the the form is valid
      if (response.status === 200) {
        console.log('✅  Success!');
        window.location.replace(`/form/thanks/index.html?clickid=${params.clickid}`);
  // If the response status isn't 200, the form wasn't accepted and will display the error message returned
      } else {
        console.log('❌  Submission failed!');
        document.querySelector('#form-error').innerHTML = response.error;
        document.querySelector('#form-error').style.display = 'block';
      }
  // Error if the 'name' and 'email' fields didn't pass the validations in the 'validateForm' function.
    } else {
      document.querySelector('#form-error').innerHTML = 'Please fill in all fields correctly';
      document.querySelector('#form-error').style.display = 'block';
    }
  }
  
  // When the page is loaded, add an event listener for our 'submitForm' function to our form's button
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', submitForm);
  });