import Accordion from "../../UI/Accordion/Accordion";
import Input from "../../UI/Input/Input";

function User(props) {
    return (
        <Accordion title={`${props.name} → Money: ${props.money} | Level: ${props.level} | Wins: ${props.wins}`}>
            <div className="horizontal-group">
                <Input id="money" placeholder="Introduce new money amount" />
                <button>Update</button>
            </div>
            <div className="horizontal-group">
                <Input id="indiv_world" placeholder="Introduce new individual level (world-level)" />
                <button>Update</button>
            </div>
            <div className="horizontal-group">
                <Input id="multi" placeholder="Introduce new wins amount" />
                <button>Update</button>
            </div>
        </Accordion>
    )
}

export default User;
