import Accordion from "../../UI/Accordion/Accordion";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {useRef, useState} from "react";
import Http from "../../utils/Http";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

function User(props) {
    const moneyRef = useRef();
    const indivRef = useRef();
    const winsRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (ev) => {
        if (ev.target.localName === 'button') {
            const reqObj = {
                url: '/api/v1/users/' + props.id,
                method: 'PUT',
                body: {}
            }
            switch (ev.target.innerHTML) {
                case 'Update money':
                    reqObj.body = {
                        money: moneyRef.current.value
                    };
                    break;
                case 'Update level':
                    reqObj.body = {
                        'indiv_level': indivRef.current.value
                    };
                    break;
                case 'Update wins':
                    reqObj.body = {
                        'multi_wins': Number.parseInt(winsRef.current.value)
                    };
                    break;
                case 'Update filled':
                    reqObj.body = {
                        money: moneyRef.current.value,
                        'indiv_level': indivRef.current.value,
                        'multi_wins': Number.parseInt(winsRef.current.value)
                    };

                    if (moneyRef.current.value === '') delete reqObj.body.money;
                    if (indivRef.current.value === '') delete reqObj.body['indiv_level'];
                    if (winsRef.current.value === '') delete reqObj.body['multi_wins'];
                    break;
                case 'Delete user':
                    reqObj.method = 'DELETE';
                    break;
            }

            if (Object.keys(reqObj.body).length !== 0 || reqObj.method === 'DELETE') {
                if (reqObj.method === 'DELETE') delete reqObj.body;

                setIsLoading(true);
                const response = await Http.fetchData(reqObj);
                setIsLoading(false);
                if (response.status || reqObj.method === 'DELETE') location.reload();
                console.log(response);
            }
        }

    }

    return (
        <>
            <Accordion onClick={handleClick} title={`${props.name} → Money: ${props.money} | Level: ${props.level} | Wins: ${props.wins}`}>
                <div className="horizontal-group">
                    <Input ref={moneyRef} placeholder="Introduce new money amount" />
                    <Button>Update money</Button>
                </div>
                <div className="horizontal-group">
                    <Input ref={indivRef} placeholder="Introduce new individual level (world-level)" />
                    <Button>Update level</Button>
                </div>
                <div className="horizontal-group">
                    <Input ref={winsRef} placeholder="Introduce new wins amount" />
                    <Button>Update wins</Button>
                </div>
                <div className="horizontal-group">
                    <Button>Update filled</Button>
                    <Button>Delete user</Button>
                </div>
            </Accordion>
            {isLoading && <LoadingSpinner show={isLoading} />}
        </>
    )
}

export default User;
