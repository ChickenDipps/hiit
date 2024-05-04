import { setLoggedInUser, getUsers } from './modules/login.mjs';

// Gets all the users from the database and displays them in a dropdown
function displayUsers(users) {
  console.log('Displaying users ' + users);
  const dropdown = document.querySelector('#users');
  for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
    const option = document.createElement('option');
    option.value = users[i].id;
    option.text = users[i].name;
    dropdown.append(option);
  }
}

// When the login button is clicked, the userID is stored in local storage
function loginButtonAttacher() {
  const button = document.querySelector('#loginButton');
  button.addEventListener('click', () => {
    const userId = document.querySelector('#users').selectedOptions[0].value;
    const userName = document.querySelector('#users').selectedOptions[0].text;
    console.log('User ID: ' + userId);
    console.log('User Name: ' + userName);

    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    setLoggedInUser();
  });
}

async function main() {
  const users = await getUsers();
  displayUsers(users);
  loginButtonAttacher();
  setLoggedInUser();
}

main();
