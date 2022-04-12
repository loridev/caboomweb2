import Form from "../components/Form/Form";
import ActionButton from "../UI/ActionButton/ActionButton";
import Input from "../UI/Input/Input";
import { Link, useNavigate } from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import Http from "../utils/Http";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import AuthContext from "../context/AuthContext";
import {toast} from "react-toastify";
import Button from "../UI/Button/Button";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [googleUrl, setGoogleUrl] = useState('');
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    useEffect(async () => {
        await getGoogleUrl();
    }, []);

    const getGoogleUrl = async () => {
        setIsGoogleLoading(true);
        const response = await Http.fetchData({method: 'GET', url: '/api/v1/auth/google/url'});

        if (response.status) {
            setGoogleUrl(response.data.url);
        } else {
            toast.error('There was an error retrieving Google auth URL');
        }


        setIsGoogleLoading(false);
    }

    const redirToGoogle = () => {
        window.location.href = googleUrl;
    }

    const logIn = async (ev) => {
        ev.preventDefault();

        setIsLoading(true);

        const responseFromApi = await Http.fetchData({
            url: '/api/v1/auth/login',
            method: 'POST',
            body: {
                name: ev.target[0].value,
                password: ev.target[1].value,
            },
        });
        if (responseFromApi.status) {
            toast.success('User logged successfully! Welcome back ' + responseFromApi.data.user.name + '!');
            localStorage.setItem('apitoken', responseFromApi.data.token);

            ctx.setToken(responseFromApi.data.token);
            ctx.setIsAdmin(responseFromApi.data.user['is_admin'] === 1);




            navigate(-1);
        } else {
            toast.warn('Username or password not correct!');
        }


        setIsLoading(false);
    };

    return (
        <div className="container">
            <Form onSubmit={logIn}>
                <Input id="user" label="Name: " />
                <Input id="pwd" label="Password: " type="password" />
                {isGoogleLoading ? <LoadingSpinner show={isGoogleLoading} />
                    : <ActionButton onClick={redirToGoogle} type="button">Sign in with Google</ActionButton>}
                <ActionButton disabled={isLoading} type="submit">Submit</ActionButton>
            </Form>
            <LoadingSpinner show={isLoading} />
            <p>
                Still without an account? <Link to="/register">Register</Link>
            </p>
        </div>

    );
}

export default Login;
