export function setLoggedInUser() {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const loginElement = document.querySelector('#login');
  console.log('User ID: ' + userId);
  if (userId && userName) {
    loginElement.textContent = 'Logged in as ' + userName + ' (';
    const changeLink = document.createElement('a');
    changeLink.href = 'login.html';
    changeLink.textContent = 'change';
    loginElement.appendChild(changeLink);
    loginElement.appendChild(document.createTextNode(')'));
  }
}
