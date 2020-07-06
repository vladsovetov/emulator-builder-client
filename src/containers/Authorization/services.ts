import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from './constants';

export const getUserFromJwt = (token: string): User => {
  const decoded = jwt.decode(token) as {
    sub: string;
    role: UserRoles;
  };

  return {
    id: decoded?.sub,
    role: decoded?.role,
  };
};

export const getTokenExpirationDelay = (token: string) => {
  const decoded = jwt.decode(token) as {
    exp: number;
  };
  console.log(
    `token will expire in: ${
      decoded.exp * 1000 - new Date(Date.now()).getTime()
    }`
  );
  return decoded.exp * 1000 - new Date(Date.now()).getTime();
};

export const storeToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const cleanToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
