// authConfig.js
const msalConfig = {
    auth: {
      clientId: '21a8e72d-6f41-420d-bf00-aeee32d5670c', // AUZRE MSAL CONFIG CLIENT ID
      authority: 'https://login.microsoftonline.com/d9f7204a-2a50-497a-a4b6-fe43429e70c7', // AUZRE MSAL CONFIG TENANT ID
      redirectUri: 'http://localhost:3000', // AUZRE MSAL CONFIG REDIREACT URL
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  };
  
  export default msalConfig;
  