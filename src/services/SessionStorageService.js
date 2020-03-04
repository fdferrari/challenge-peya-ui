
const TOKEN_KEY = 'x-access-token';
const USER_KEY = 'myUser';
export default {
  saveToken: function(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  },
  saveUser: function(user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));

  },
  getToken: function() {
    return sessionStorage.getItem(TOKEN_KEY);
  },
  getUser: function() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
};
