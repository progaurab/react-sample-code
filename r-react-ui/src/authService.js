// authService.js

import { PublicClientApplication } from "@azure/msal-browser";
import msalConfig from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

(async () => {
  await msalInstance.initialize();
})();

class AuthService {
  constructor() {
    this.msalInstance = msalInstance;
  }

  login = async () => {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };

    try {
      await this.msalInstance.loginPopup(loginRequest);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  logout = () => {
    this.msalInstance.logout();
  };

  getToken = async () => {
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      // User is not logged in, prompt them to sign in
      await this.login();
      return null;
    }

    if (accounts.length > 1) {
      // User has multiple accounts, set the active account
      this.msalInstance.setActiveAccount(accounts[0]);
    }

    const tokenRequest = {
      scopes: ["User.Read"],
    };

    try {
      const response = await this.msalInstance.acquireTokenSilent(tokenRequest);
      return response.accessToken;
    } catch (error) {
      console.error("Error acquiring token:", error);
      return null;
    }
  };
}

const authService = new AuthService();
export default authService;
