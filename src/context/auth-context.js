import React from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState({
        token: "",
        userData: ""
    });

    // checks if the user is authenticated or not
    const isUserAuthenticated = () => !!authState.token;

    return (
        <Provider
            value={{
                authState,
                setAuthState,
                isUserAuthenticated,
            }}
        >
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };