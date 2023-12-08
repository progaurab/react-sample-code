npm install react react-dom react-scripts @azure/msal-browser



import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: 'your-client-id',
    authority: `https://login.microsoftonline.com/your-tenant-id`,
    redirectUri: 'http://localhost:3000', // Replace with your app's redirect URI
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export const authenticate = async () => {
  try {
    const authResponse = await msalInstance.loginPopup();
    return authResponse.accessToken;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};
