// useLogin.js
import { useContext, useState } from "react";
import authManager from "../designpattern/AuthManager";
import { UserContext } from "../UserContext";

function useLogin() {
  const { setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  async function handleLoginSubmit(ev, email, password) {
    ev.preventDefault();
    try {
      const success = await authManager.login(email, password);
      if (success) {
        alert("Login successful!!");
        setUser(authManager.getUser());
        setRedirect(true);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  }

  return { handleLoginSubmit, redirect };
}

export default useLogin;
