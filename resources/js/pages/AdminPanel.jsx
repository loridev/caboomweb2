import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import UserList from "../components/User/UserList";
import User from '../components/User/User';
import Http from "../utils/Http";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const ctx = useContext(AuthContext);

    const loadUsers = async () => {
        setIsLoading(true);
        const response = await Http.fetchData({url: '/api/v1/users'});
        setUsers(response.data);
    }

    const loadDom = () => {
        if (isLoading || ctx.isAdmin === null) {
            return (
                <LoadingSpinner show={isLoading} />
            );
        } else {
            if (!ctx.isAdmin) {
                return (
                    <h1>ERROR: You must be admin to access the admin panel</h1>
                );
            } else {
                return (
                    <UserList>
                        {users.map((user) => <User id={user.id} name={user.name} money={user.money}
                                                   level={user['indiv_level']} wins={user['multi_wins']}/>)}
                    </UserList>
                );
            }
        }
    }

    useEffect(async () => {
        await loadUsers();
    }, []);

    useEffect(() => {
        setIsLoading(ctx.isAdmin === null);
    }, [ctx.isAdmin]);

    return (
        <>
            {
                loadDom()
            }

        </>
    )
}

export default AdminPanel;
