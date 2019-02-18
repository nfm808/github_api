'use strict';

//fetch user info
function getUser(user) {
  const url = `https://api.github.com/users/${user}/repos`
  const options = {
    headers: new Headers({
      "Accept": "application/vnd.github.v3+json"
    })
  };
  fetch(url, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error (response.statusText);
  })
  .then(responseJson => displayResults(responseJson, user))
  .catch(err => {
    $('#js_error_message').text(`Something went wrong: ${err.message}`);
  });
};

//handle form
function handleForm() {
  $('#js_form').submit(function(e) {
    e.preventDefault();
    const user =  $('#js_username').val();
    getUser(user);
  });
};

//display user info
function displayResults(responseJson, user) {
  console.log(responseJson);
  const header = `<h2 class="username">${user}</h2>`
  const name = responseJson.forEach(element => element.name);
  console.log(name);
  //empty any previous search
  $('.results').empty();
  $('.results').prepend(header);
  $('.results').append(results);
  //iterate through the user array
  $('.results').toggleClass('hidden');
};

function handlePage() {
  handleForm();
};

$(handlePage());