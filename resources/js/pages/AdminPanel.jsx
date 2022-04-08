import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import UserList from "../components/User/UserList";
import User from '../components/User/User';
import Http from "../utils/Http";
function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const ctx = useContext(AuthContext);

    const loadUsers = async () => {
        const response = await Http.fetchData({url: '/api/v1/users'});
        setUsers(response.data);

        console.log(response);
    }

    useEffect(async () => {
        await loadUsers();
    }, [])

    return (
        <>
            { ctx.isAdmin ?
                <UserList>
                    {users.map((user) => <User id={user.id} name={user.name} money={user.money}
                                               level={user['indiv_level']} wins={user['multi_wins']}/>)}
                </UserList> :
                <h1>ERROR: You must be admin to access the admin panel</h1>
            }
        </>
    )
}

export default AdminPanel;
