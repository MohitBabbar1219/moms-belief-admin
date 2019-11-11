import jwtDecoder from "jwt-decode";

const isAuthenticated = () => {
  if (!localStorage.getItem('authToken')) {
    return false;
  }
  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecoder(authToken);
  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.clear();
    return false;
  }
  return true;
};

export default isAuthenticated;
