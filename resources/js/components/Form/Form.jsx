import classes from './styles/Form.module.css';

function Form(props) {
    return (
        <form onSubmit={props.onSubmit} className={`container ${classes.form}`}>
            {props.children}
        </form>
    )
}

export default Form;