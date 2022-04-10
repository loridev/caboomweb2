import clases from './Button.module.css';
function Button(props) {

    return (
        <button disabled={props.disabled} type={props.type} className={`${clases.button} ${props.disabled && 'disabled'}`}>{props.children}</button>
    );
}

export default Button;
