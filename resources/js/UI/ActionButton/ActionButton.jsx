import clases from './ActionButton.module.css';

function ActionButton(props) {

    return (
        <button disabled={props.disabled} type={props.type} className={`${clases.button} ${props.disabled && 'disabled'}`}><span>{props.children}</span></button>
    );
}

export default ActionButton;
