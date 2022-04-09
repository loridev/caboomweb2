import Form from "../components/Form/Form";
import ActionButton from "../UI/ActionButton/ActionButton";
import Input from "../UI/Input/Input";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import Http from "../utils/Http";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import AuthContext from "../context/AuthContext";
import {toast} from "react-toastify";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

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
            localStorage.setItem('apitoken', responseFromApi.data.token);

            ctx.setToken(responseFromApi.data.token);
            ctx.setIsAdmin(responseFromApi.data.user['is_admin'] === 1);




            navigate('/');
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
                <ActionButton type="submit">Submit</ActionButton>
            </Form>
            <LoadingSpinner show={isLoading} />
            <p>
                Still without an account? <Link to="/register">Register</Link>
            </p>
        </div>

    );
}

export default Login;
