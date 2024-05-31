export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }

  export function removeTokenFromLocalStorage() {
    localStorage.removeItem('token');
  }