// AuthManager.js
import axios from "axios";

class AuthManager {
  constructor() {
    if (!AuthManager.instance) {
      this.user = null;
      AuthManager.instance = this;
    }
    return AuthManager.instance;
  }

  async login(email, password) {
    try {
      const response = await axios.post("/login", { email, password });
      this.user = response.data;
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  logout() {
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return !!this.user;
  }
}

const authManager = new AuthManager();

export default authManager;
