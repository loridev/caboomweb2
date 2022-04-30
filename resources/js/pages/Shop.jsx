import { toast } from "react-toastify";
import {useEffect, useState} from "react";
import Card from "../UI/Card/Card";
import classes from './styles/Shop.module.css';
import Http from "../utils/Http";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

function Shop() {
    const [itemsUsers, setItemsUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [money, setMoney] = useState(0);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);

    const loadMoney = async () => {
        if (localStorage.getItem('apitoken')) {
            const response = await Http.fetchData({
                'url': '/api/v1/auth/current',
                'method': 'POST',
                'token': localStorage.getItem('apitoken')
            });

            if (response.status) {
                setMoney(response.data.data.money);
            } else {
                toast.error('There was an error retrieving the user info');
            }
        }
    }

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

    const clickHandler = async (id, price) => {
        if (!localStorage.getItem('apitoken')) {
            toast.warn('You must be logged in to perform this action!');
        } else if (isLoadingPurchase) {
            toast.warn('You already have a purchase in progress!');
        } else {
            setIsLoadingPurchase(true);
            if (money < price) {
                toast.error('You have not enough money to perform this purchase!');
            } else {
                const response = await Http.fetchData({
                    url: '/api/v1/users/additem',
                    method: 'POST',
                    token: localStorage.getItem('apitoken'),
                    body: {
                        'item_id': id
                    }
                });

                if (response.status) {
                    toast.success('Item added to the inventory!', {autoClose: 1000});
                    setTimeout(() => location.reload(), 1000);
                } else {
                    toast.error(response.data.error);
                }
            }
            setIsLoadingPurchase(false);
        }
    }

    useEffect(async () => {
        setIsLoadingData(true);
        await loadMoney();
        await loadItemsUsers();
        await loadItems();
        setIsLoadingData(false);
    }, []);

    return (
        <>
            {isLoadingData ? <LoadingSpinner show={isLoadingData} /> : (
                <>
                    <div className={classes.cointainer}>
                        <img src="/images/coin.svg" className={classes.coin} />
                        <span>{money}</span>
                    </div>
                    <div className="wrapper">
                        {items.map((item) => {
                            const existsInUser = itemsUsers
                                .filter((itemUser) => itemUser['item_id'] === item.id).length !== 0;

                            return (
                                <Card key={item.id} onClick={() => clickHandler(item.id, item.price)}
                                      className={`${classes[item.category.toLowerCase()]} ${existsInUser ? 'disabled': null}`}
                                      title={`${item['skin_texture'].toUpperCase().replace('_', ' ')} | ${item.type}`}
                                      description={`PRICE: ${item.price} coins`}
                                      img={`/images/${item['skin_texture']}.png`}
                                      buttonText={existsInUser ? 'PURCHASED' : 'BUY'}
                                      disabled={existsInUser}
                                />
                            );
                        })}
                    </div>
                </>
            )}
            {isLoadingPurchase && <LoadingSpinner show={isLoadingPurchase} />}

        </>
    )
}

export default Shop;
