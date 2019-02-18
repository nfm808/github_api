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
  const header = `<h2 class="username">${user}</h2>`
  const results = responseJson.map(element => {
    return `<h3> ${element.name} </h3>
            <p> <a href="${element.html_url}">${element.html_url}</a></p>`
  });
  //empty any previous search
  $('.results').empty();
  $('.results').prepend(header);
  $('.results').append(results.join(""));
};



function handlePage() {
  handleForm();
};

$(handlePage());