import React, {forwardRef, useState} from "react";
import classes from './styles/Input.module.css';

const Input = forwardRef((props, ref) => {
    const [valueInput, setValueInput] = useState('');

    const setValue = (ev) => setValueInput(ev.target.value);

    return (
        <div className={classes.inputContainer}>
            <label htmlFor={props.id}>{props.label}</label><br />
            <input
                id={props.id}
                name={props.id}
                type={props.type || 'text'}
                onChange={setValue}
                onBlur={setValue}
                className={`${classes.input} ${props.className}`}
                placeholder={props.placeholder}
                value={valueInput}
                ref={ref}
            />
            <small>{props.description}</small>
        </div>

    );
});

export default Input;
