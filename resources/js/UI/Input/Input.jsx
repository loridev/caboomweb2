import React, {useEffect} from "react";
import classes from './styles/Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const [valueInput, setValueInput] = React.useState('');

    const setValue = (ev) => setValueInput(ev.target.value);

    useEffect(() => {
        console.log(ref.current);
    }, [])

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
        </div>

    );
});

export default Input;
