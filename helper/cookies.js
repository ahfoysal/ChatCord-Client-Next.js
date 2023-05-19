import { parseCookies, setCookie, destroyCookie } from 'nookies';

// Get a cookie by name
export const getCookie = (name) => {
  return parseCookies()[name];
};

// Set a cookie with default options
export const setCookieWithOptions = (name, value, options = { maxAge: 30 * 24 * 60 * 60, path: '/' }) => {
  setCookie(null, name, value, options);
};

// Remove a cookie by name
export const removeCookie = (name) => {
  destroyCookie(null, name);
};
