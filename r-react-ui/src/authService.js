// authService.js
import { PublicClientApplication } from '@azure/msal-browser';
import msalConfig from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

export const login = async () => {
  const loginRequest = {
    scopes: ['openid', 'profile', 'User.Read'],
  };

  try {
    await msalInstance.loginPopup(loginRequest);
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const logout = () => {
  msalInstance.logout();
};

export const getToken = async () => {
  const tokenRequest = {
    scopes: ['User.Read'],
  };

  try {
    const response = await msalInstance.acquireTokenSilent(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    return null;
  }
};
