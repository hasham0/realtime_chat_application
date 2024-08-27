// base url
const HOST: string = String(import.meta.env.VITE_SERVER_URL!);

//! auth route url
const AUTH_ROUTE: string = `api/auth`;
const SIGNUP_ROUTE: string = `${AUTH_ROUTE}/signup`;
const LOGIN_ROUTE: string = `${AUTH_ROUTE}/login`;

// note:export routes
export { HOST, AUTH_ROUTE, SIGNUP_ROUTE, LOGIN_ROUTE };
