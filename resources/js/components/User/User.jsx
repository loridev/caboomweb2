import Accordion from "../../UI/Accordion/Accordion";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {useRef} from "react";
import Http from "../../utils/Http";

function User(props) {
    const moneyRef = useRef();
    const indivRef = useRef();
    const winsRef = useRef();

    const handleClick = async (ev) => {
        if (ev.target.localName === 'button') {
            const reqObj = {
                url: '/api/v1/users/' + props.id,
                method: 'PUT',
            }
            debugger
            switch (ev.target.innerHTML) {
                case 'Update money':
                    reqObj.body = {
                        money: moneyRef.current.value
                    };
                    break;
                case 'Update level':
                    reqObj.body['indiv_level'] = indivRef.current.value;
                    break;
                case 'Update wins':
                    reqObj.body['multi_wins'] = winsRef.current.value;
                    break;

            }

            const response = await Http.fetchData(reqObj);

            console.log(response);
        }

    }

    return (
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
        </Accordion>
    )
}

export default User;
