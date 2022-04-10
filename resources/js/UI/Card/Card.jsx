import classes from './styles/Card.module.css';
import Button from "../Button/Button";

function Card(props) {
    return (
        <div onClick={props.onClick} className={`${classes.card} ${props.className}`}>
            <div>
                <img className={classes.img} src={props.img} />
                <h2 className={classes.title}>{props.title}</h2>
                <p className={classes.description}>{props.description}</p>
            </div>
            <Button disabled={props.disabled}>{props.buttonText}</Button>
        </div>
    )
}

export default Card;
