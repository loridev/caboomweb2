import {useState} from "react";
import classes from './styles/Select.module.css';

function Select (props) {
    const [value, setValue] = useState('');

    const handleValue = (ev) => setValue(ev.target.value);

    return (
        <>
            <select id={props.id} name={props.id} className={classes.select} value={value} onChange={handleValue}
                    disabled={props.disabled} placeholder={props.placeholder}>
                {props.children}
            </select>
        </>
    );
}

export default Select;
