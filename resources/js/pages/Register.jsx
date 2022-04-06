import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Http from './../utils/Http';

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const register = async (ev) => {
        ev.preventDefault();

        setIsLoading(true);

        if (ev.target[2].value !== ev.target[3].value) {
            // TOAST
        }

        const responseFromApi = await Http.fetchData({
            url: '/api/v1/users/register',
            method: 'POST',
            body: {
                username: ev.target[0].value,
                email: ev.target[1].value,
                password: ev.target[2].value,
                is_admin: false
            }
        });

        console.log(responseFromApi);

        setIsLoading(false);
    };

    return (
        <div className="container">
            <Form onSubmit={register}>
                <Input id="user" label="Username: " />
                <Input id="email" label="Email: " />
                <Input type="password" id="pwd" label="Password: " />
                <Input type="password" id="repeat" label="Repeat password: " />
                <Button type="submit">Submit</Button>
            </Form>
            <LoadingSpinner show={isLoading} />
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>

    );
}

export default Register;
