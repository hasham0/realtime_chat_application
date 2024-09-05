// base url
const HOST: string = String(import.meta.env.VITE_SERVER_URL!);

//! auth route url
const AUTH_ROUTE: string = `api/auth`;
const SIGNUP_ROUTE: string = `${AUTH_ROUTE}/signup`;
const LOGIN_ROUTE: string = `${AUTH_ROUTE}/login`;
const USER_INFO_ROUTE: string = `${AUTH_ROUTE}/user-info`;
const PROFILE_UPDATE_ROUTE: string = `${AUTH_ROUTE}/update-user-info`;

// note:export routes
export {
  HOST,
  AUTH_ROUTE,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  USER_INFO_ROUTE,
  PROFILE_UPDATE_ROUTE,
};
