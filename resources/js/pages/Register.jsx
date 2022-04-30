import {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";
import ActionButton from "../UI/ActionButton/ActionButton";
import Input from "../UI/Input/Input";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Http from './../utils/Http';
import {toast} from "react-toastify";
import AuthContext from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const ctx = useContext(AuthContext);

    const redirToGoogle = () => {
        window.location.assign('/redirect/google');
    }

    const register = async (ev) => {
        ev.preventDefault();

        setIsLoading(true);

        const responseFromApi = await Http.fetchData({
            url: '/api/v1/auth/register',
            method: 'POST',
            body: {
                name: ev.target[0].value,
                email: ev.target[1].value,
                password: ev.target[2].value,
                confirmPassword: ev.target[3].value
            }
        });

        if (!responseFromApi.status) {
            Object.keys(responseFromApi.data.errors).forEach((k) => {
                responseFromApi.data.errors[k].forEach((error) => {
                    toast.error(error);
                });
            });
        } else {
            toast.success('User registered successfully!', {autoClose: 1000});

            setTimeout(() => {
                ctx.setToken(responseFromApi.data.token);
                localStorage.setItem('apitoken', responseFromApi.data.token);
                navigate(-1);
            }, 1000);

        }

        console.log(responseFromApi);

        setIsLoading(false);
    };

    return (
        <div className="container">
            <Form onSubmit={register}>
                <Input id="user" label="Name: " description="3 characters minimum, 12 characters maximum, no symbols allowed"/>
                <Input id="email" label="Email: " description="example@example.com"/>
                <Input type="password" id="pwd" label="Password: " description="8 characters, 1 uppercase, 1 lowercase, 1 number at least"/>
                <Input type="password" id="repeat" label="Repeat password: " description="Repeat the password value" />
                <ActionButton disabled={isLoading} type="submit">Submit</ActionButton>
                <ActionButton disabled={isLoading} onClick={redirToGoogle} type="button">Sign in with Google</ActionButton>
            </Form>
            <LoadingSpinner show={isLoading} />
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>

    );
}

export default Register;
