class TokenService {
  getLocalRefreshToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token?.refresh_token;
  }

  getLocalAccessToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token?.access_token;
  }

  updateLocalAccessToken(updatetoken) {
    let token = JSON.parse(localStorage.getItem("token"));
    token.access_token = updatetoken;
    localStorage.setItem("token", JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }

  setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
