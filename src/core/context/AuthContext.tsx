import { createContext, ReactNode, useState } from "react";
import { authenticationRepository } from "../service/authenticationService/authenticationRepository";
import { User } from "../model/User";

// declare type of data in AuthContext
interface AuthContextValue {
  isAuthenticated: boolean;
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
  saveToken: (token: string) => void;
  logout: () => void;
}

// declare type of props of AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

// create the context with a default value
export const AuthContext = createContext({} as AuthContextValue);

// a component that act as a `provider` for an `AuthContext`
// this component only wrap it's children
export const AuthContextProvider = (props: AuthContextProviderProps) => {
  // initial token value is retrieved from localStorage, if null return an empty string

  // TODO Test expiration du token
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();

  const saveToken = (token: string) => {
    setToken(token);
  };

  const logout = async () => {
    authenticationRepository.signOut();
    authenticationRepository.signOutServerSide(token);
    setToken("");
    setCurrentUser(undefined);
    await fetch("/api/auth/remove", {
      method: "GET",
      credentials: "same-origin",
    });
  };

  const authContextValue: AuthContextValue = {
    isAuthenticated: !!token, // user is authenticated if token is not `falsy` (not "", false, undefined, null)
    currentUser,
    setCurrentUser,
    saveToken,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
