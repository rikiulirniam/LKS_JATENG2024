import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useAxios } from "./hooks";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [load, setLoad] = useState(true);

  const auth = useAuth();
  const axios = useAxios();

  function loading() {
    axios
      .get("/auth/me")
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((f) => {
        setLoad(false);
      });
  }

  useEffect(() => {
    loading();
  }, []);

  if (load) {
    return <h3>Loading...</h3>;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthGuard = ({ children }) => {
  const auth = useAuth();
  if (auth.user) {
    return <>{ children }</>;
  }
  return <Navigate to="/" />;
};
