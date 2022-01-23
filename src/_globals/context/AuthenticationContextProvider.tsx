import React, { ReactElement, useContext, useState, ReactNode } from "react";

interface AuthenticationContext {
  isUserPinLocked: boolean;
  isUserLoggedIn: boolean;
  setIsUserPinLocked: (argo0: boolean) => void;
  setIsUserLoggedIn: (argo0: boolean) => void;
}

const AuthenticationContext = React.createContext({} as AuthenticationContext);

/**
 *? AuthenticationContext & AuthenticationProvider
 ** For control over Authentications or Authentication-like things
 ** as to not pollute the AuthProvider as much
 */
const AuthenticationProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [isUserPinLocked, setIsUserPinLocked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
        setIsUserPinLocked,
        setIsUserLoggedIn,
        isUserPinLocked,
        isUserLoggedIn,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

// * The useAuthentication hook can be used by components under an AuthenticationProvider to
// * access the auth context value.
const useAuthentication = (): AuthenticationContext => {
  const authenticaiton = useContext(AuthenticationContext);
  if (authenticaiton == null) {
    throw new Error("useAuthentication() called outside of a AuthenticationProvider?");
  }
  return authenticaiton;
};

export { AuthenticationProvider, useAuthentication };
