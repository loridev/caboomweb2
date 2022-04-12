import {useContext, useEffect, useState} from "react";
import Http from "../utils/Http";
import {useNavigate} from "react-router-dom";
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
    const [socialId, setSocialId] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    useEffect(async () => {
        await getUser();
    }, []);

    const getUser = async () => {
        setIsLoading(true);
        const response = await Http.fetchData({
            method: 'GET',
            url: '/api/v1/auth/google/callback' + window.location.search
        });

        if (response.status) {
            if (response.data.token) {
                setExists(true);
                ctx.setToken(response.data.token);
                localStorage.setItem('apitoken', response.data.token);
                toast.success('User logged in successfully', {autoClose: 1000});
                setIsLoading(false);
                setTimeout(() => {
                    navigate('/', 1000);
                });
            } else {
                setExists(false);
                toast.info('Introduce a name and a password for you new user');
                setSocialId(response.data.googleData['social_id']);
                setEmail(response.data.googleData.email);
            }
        }
        setIsLoading(false);
    }

    const registerUser = async (ev) => {
        ev.preventDefault();

        setIsLoading(true);

        const responseFromApi = await Http.fetchData({
            url: '/api/v1/auth/register',
            method: 'POST',
            body: {
                name: ev.target[0].value,
                password: ev.target[1].value,
                email,
                'social_id': socialId
            },
        });

        console.log(responseFromApi.data);
    }

    return (
        <div className="container">
            { isLoading && <LoadingSpinner show={isLoading} /> }
            {
                !exists && (
                    <Form onSubmit={registerUser}>
                        <Input id="user" label="Name: " />
                        <Input id="pwd" label="Password: " type="password" />
                        <ActionButton disabled={isLoadingForm} type="submit">Submit</ActionButton>
                    </Form>
                )
            }
            {isLoadingForm && <LoadingSpinner show={isLoadingForm} />}
        </div>

    );
}

export default CompleteRegister;
