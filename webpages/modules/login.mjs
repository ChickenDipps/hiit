export function setLoggedInUser() {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const loginElement = document.querySelector('#login');
  console.log('User ID: ' + userId);
  if (userId && userName) {
    loginElement.textContent = 'Logged in as ' + userName;
  } else {
    loginElement.textContent = 'Not logged in';
  }
}
