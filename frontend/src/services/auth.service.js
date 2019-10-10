import jwtDecode from 'jwt-decode';

const localStorageKey = 'issuedex-user';
let user;

const login = () => {
  //eslint-disable-next-line
  location.href = `${
    process.env.REACT_APP_AUTH_URL
  }/login?client_id=${encodeURIComponent(
    process.env.REACT_APP_AUTH_CLIENT_ID,
  )}&redirect_uri=${encodeURIComponent(
    `${process.env.REACT_APP_GUI_URL}`,
  )}&response_type=token&scope=${encodeURIComponent('openid profile email')}`;
};

const loginCallback = () => {
  //eslint-disable-next-line
  const [token] = location.href.match(/(?<=id_token=)[^&]*/);
  const claims = jwtDecode(token);
  user = {
    id: claims.sub,
    login: claims.email,
    firstName: claims.name,
    lastName: claims.family_name,
    idToken: token,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(user));
  console.debug(`User login successful.`);
  console.debug(`${user.id} ${user.login} ${user.firstName} ${user.lastName}`);
};

const isTokenPresent = () => {
  //eslint-disable-next-line
  return location.href.match(/(?<=id_token=)[^&]*/);
};

export const logout = () => {
  localStorage.removeItem(localStorageKey);
  console.debug('User deleted from the local storage');
  //eslint-disable-next-line
  location.href = `${
    process.env.REACT_APP_AUTH_URL
  }/logout?client_id=${encodeURIComponent(
    process.env.REACT_APP_AUTH_CLIENT_ID,
  )}&logout_uri=${encodeURIComponent(`${process.env.REACT_APP_GUI_URL}`)}`;
};

export const init = () => {
  const item = localStorage.getItem(localStorageKey);
  if (item) {
    user = JSON.parse(item);
    console.debug('User loaded from local storage');
  } else {
    if (isTokenPresent()) {
      loginCallback();
    } else {
      console.debug(
        'User not present in local storage, redirecting to login page',
      );
      login();
    }
  }
};

export const getToken = () => user.idToken;
export const getUser = () => user;
