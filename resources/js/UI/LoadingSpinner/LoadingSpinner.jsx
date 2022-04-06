import classes from './styles/LoadingSpinner.module.css';

function LoadingSpinner(props) {
    return(
        <div className={`${classes.spinner} ${!props.show ? 'hide' : ''}`}></div>
    )
}

export default LoadingSpinner;