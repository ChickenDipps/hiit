import { setLoggedInUser, getUsers } from './modules/login.mjs';


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

function loginButtonAttacher() {
  const button = document.querySelector('#loginButton');
  button.addEventListener('click', () => {
    const userId = document.querySelector('#users').selectedOptions[0].value;
    const userName = document.querySelector('#users').selectedOptions[0].text;
    console.log('User ID: ' + userId);
    console.log('User Name: ' + userName);

    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    const loggedInUsers = document.querySelector('#login');
    loggedInUsers.textContent = 'Logged in as ' + userName;
  });
}

async function main() {
  const users = await getUsers();
  displayUsers(users);
  loginButtonAttacher();
  setLoggedInUser();
}

main();
