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
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'logout';
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      setLoggedInUser();
    });
    loginElement.appendChild(logoutLink);
  } else {
    loginElement.textContent = 'Not logged in (';
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.textContent = 'login';
    loginElement.appendChild(loginLink);
    loginElement.appendChild(document.createTextNode(')'));
  }
}
