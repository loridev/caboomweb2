import Accordion from "../../UI/Accordion/Accordion";
import Button from "../../UI/Button/Button";

function User(props) {
    return (
        <Accordion title={props.name}><div>HOLA</div><Button>HOLA</Button></Accordion>
    )
}

export default User;
