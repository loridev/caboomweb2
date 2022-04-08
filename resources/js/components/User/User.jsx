import Accordion from "../../UI/Accordion/Accordion";
import ActionButton from "../../UI/ActionButton/ActionButton";

function User(props) {
    return (
        <Accordion title={props.name}><div>HOLA</div><ActionButton>HOLA</ActionButton></Accordion>
    )
}

export default User;
