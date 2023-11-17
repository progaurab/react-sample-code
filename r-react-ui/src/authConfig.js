// authConfig.js
const msalConfig = {
    auth: {
      clientId: '7cu4hh4-6bh4ph4-6bd4hh4-6kh4hh4', // AUZRE MSAL CONFIG CLIENT ID
      authority: 'https://login.microsoftonline.com/7tu4hh4-6bh4ph4-6bd4hh4-6kh4hh4', // AUZRE MSAL CONFIG TENANT ID
      redirectUri: 'https://localhost:2000', // AUZRE MSAL CONFIG REDIREACT URL
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  };
  
  export default msalConfig;
  