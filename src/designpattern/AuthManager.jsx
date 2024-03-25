// AuthManager.js
import axios from "axios";

class AuthManager {
  constructor() {
    if (!AuthManager.instance) {
      this.user = null;
      this.observers = [];
      AuthManager.instance = this;
    }
    return AuthManager.instance;
  }

  async login(email, password) {
    try {
      const response = await axios.post("/login", { email, password });
      this.user = response.data;
      this.notifyObservers();
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
  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update());
  }
}

const authManager = new AuthManager();

export default authManager;
