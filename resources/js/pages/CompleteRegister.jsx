import {useContext, useEffect, useState} from "react";
import Http from "../utils/Http";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import AuthContext from "../context/AuthContext";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Form from "../components/Form/Form";
import Input from "../UI/Input/Input";
import ActionButton from "../UI/ActionButton/ActionButton";

function CompleteRegister() {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const [exists, setExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const {socialId, email} = useParams();

    const registerUser = async (ev) => {
        ev.preventDefault();

        setIsLoading(true);

        const responseFromApi = await Http.fetchData({
            url: '/api/v1/auth/register',
            method: 'POST',
            body: {
                name: ev.target[0].value,
                password: ev.target[1].value,
                confirmPassword: ev.target[2].value,
                email,
                'social_id': socialId
            },
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
                navigate('/');
            }, 1000);

        }

        setIsLoading(false);
    }

    return (
        <div className="container">
            { isLoading && <LoadingSpinner show={isLoading} /> }
            {
                !exists && (
                    <Form onSubmit={registerUser}>
                        <Input id="user" label="Name: " description="3 characters minimum, 12 characters maximum, no symbols allowed"/>
                        <Input type="password" id="pwd" label="Password: " description="8 characters, 1 uppercase, 1 lowercase, 1 number at least"/>
                        <Input type="password" id="repeat" label="Repeat password: " description="Repeat the password value" />
                        <ActionButton disabled={isLoadingForm} type="submit">Submit</ActionButton>
                    </Form>
                )
            }
            {isLoadingForm && <LoadingSpinner show={isLoadingForm} />}
        </div>

    );
}

export default CompleteRegister;
