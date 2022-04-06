import { Link } from 'react-router-dom';
import classes from './styles/NavLink.module.css';
import Http from './../../utils/Http';
import { useContext } from 'react';
import AuthContext from './../../context/AuthContext';

// TODO : FUNCION QUE LLAMA A LA API EN UN ONCLICK DE UN DIV SI PROPS.TEXT ES LOG OUT
function NavLink(props) {
    const ctx = useContext(AuthContext);

    const logout = async () => {
        const response = await Http.fetchData({
            url: '/api/v1/users/logout',
            method: 'POST',
            token: ctx.token,
        })

        if (response.status) {
            localStorage.removeItem('apitoken');
            ctx.setToken(null);
            location.reload();
        }
    };

    return (
        <li className={classes.option}>
            {props.text === "Log out" ? (
                <a href="#" onClick={logout}>{props.text}</a>
            ) : (
                <Link to={ props.to }>{props.text}</Link>
            )}
        </li>
    );
}

export default NavLink;
