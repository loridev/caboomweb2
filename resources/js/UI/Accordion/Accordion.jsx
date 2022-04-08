import classes from './styles/Accordion.module.css';
import {useState} from "react";

function Accordion(props) {
    const [isActive, setIsActive] = useState(false);
    const handleActive = () => setIsActive(!isActive);

    return (
        <div onClick={props.onClick} className={classes.accordion}>
            <div className={classes.item}>
                <div className={classes.title} onClick={handleActive}>
                    <div className="highlight">{props.title}</div>
                    <div>{isActive ? '▲' : '▼'}</div>
                </div>
                {isActive && <div className={classes.content}>{props.children}</div>}
            </div>
        </div>
    )
}

export default Accordion;
