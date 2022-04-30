import { createContext, useEffect, useState } from "react";
import Http from "../utils/Http";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({
    token: '',
    isAdmin: null,
    getToken: () => {},
    setToken: () => {},
    setIsAdmin: () => {}
});
export default AuthContext;

export function AuthContextProvider(props) {
    const [token, setToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();

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
            const currUser = await Http.fetchData({url: '/api/v1/auth/current', method: 'POST', token});
            console.log(currUser);
            if (currUser.status) {
                setIsAdmin(currUser.data.data['is_admin'] === 1);
            } else {
                toast.error('There was an error retrieving user info');
                localStorage.removeItem('apitoken');
                setToken(null);
                navigate('/login');
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
