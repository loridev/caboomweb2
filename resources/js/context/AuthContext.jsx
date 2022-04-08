import { createContext, useEffect, useState } from "react";
import Http from "../utils/Http";

const AuthContext = createContext({
    token: '',
    isAdmin: false,
    getToken: () => {},
    setToken: () => {},
    setIsAdmin: () => {}
});
// TODO: LOADING
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

    const checkAdmin = async () => {
        if (token) {
            const currUser = await Http.fetchData({url: '/api/v1/auth/current', method: 'POST', token: token});
            console.log(currUser);
            if (currUser.status) {
                setIsAdmin(currUser.data.data['is_admin'] === 1);
            }
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    useEffect(async () => {
        await checkAdmin();
    }, [token]);

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
