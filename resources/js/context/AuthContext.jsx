import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
    token: '',
    isAdmin: false,
    getToken: () => {},
    setToken: () => {},
    setIsAdmin: () => {}
});

export default AuthContext;

export function AuthContextProvider(props) {
    const [token, setToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const getToken = () => {
        try {
            console.log('hola');
            setToken(localStorage.getItem('apitoken'));
        } catch (err) {
            console.log('error retrieving token');
            setToken(null);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    const context = {
        token,
        isAdmin,
        getToken,
        setToken,
        setIsAdmin
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}
