import { toast } from "react-toastify";
import {useEffect, useState} from "react";
import Card from "../UI/Card/Card";
import classes from './styles/Shop.module.css';
import Http from "../utils/Http";

function Shop() {
    const [itemsUsers, setItemsUsers] = useState([]);
    const [items, setItems] = useState([]);

    const loadItemsUsers = async () => {
        const reqObj = {method: 'GET', url: '/api/v1/itemusers'};
        if (localStorage.getItem('apitoken')) {
            reqObj.token = localStorage.getItem('apitoken');
            reqObj.url += '/current';
        }
        const response = await Http.fetchData(reqObj);

        setItemsUsers(response.data.filter((itemUser) => itemUser.current));
    }

    const loadItems = async () => {
        const response = await Http.fetchData({method: 'GET', url: '/api/v1/items'});
        setItems(response.data);
    }

    useEffect(async () => {
        await loadItemsUsers();
        await loadItems();
    }, []);

    return (
        <div className="wrapper">
            {items.map((item) => {
                const existsInUser = itemsUsers
                    .filter((itemUser) => itemUser['item_id'] === item.id).length !== 0;

                return (
                    <Card className={`${classes[item.category.toLowerCase()]} ${existsInUser ? 'disabled': null}`}
                          title={`${item['skin_texture'].toUpperCase()} | ${item.type}`}
                          description={`PRICE: ${item.price} coins`}
                          img={`/images/${item['skin_texture']}.png`}
                          buttonText={existsInUser ? 'PURCHASED' : 'BUY'}
                          disabled={existsInUser}
                    />
                );
            })}
        </div>
    )
}

export default Shop;
