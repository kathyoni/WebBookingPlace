import { useEffect } from "react";
import authManager from "./designpattern/AuthManager";

function useAuthObserver(setUser) {
  useEffect(() => {
    const observer = {
      update: () => {
        setUser(authManager.getUser());
      },
    };

    authManager.addObserver(observer);

    return () => {
      authManager.removeObserver(observer);
    };
  }, [setUser]);
}

export default useAuthObserver;
