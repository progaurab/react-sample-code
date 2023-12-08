npm install react react-dom react-scripts @azure/msal-browser

______

import { useEffect, useState } from 'react';
import { authenticate } from './auth'; // Import your authentication function

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await authenticate();
      if (token) {
        setAccessToken(token);
        // Now you can use the accessToken to make API calls
        // For example, fetch Azure AD groups using the token
        const groups = await fetchAzureADGroups(token);
        if (groups) {
          console.log('Azure AD Groups:', groups);
        }
      }
    };

    fetchData();
  }, []);

  // Rest of your component code...
};

____

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
