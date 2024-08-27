const HOST: string = String(import.meta.env.VITE_SERVER_URL!);
const AUTH_ROUTE: string = `api/auth`;
const SIGNUP_ROUTE: string = `${AUTH_ROUTE}/signup`;

export { HOST, AUTH_ROUTE, SIGNUP_ROUTE };
