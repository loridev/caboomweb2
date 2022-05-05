import clases from "./styles/ButtonSocialMedia.module.css";

function ButtonSocialMedia(props) {
    return(
        <button className={clases.button}><i className={`fa fa-${props.name}`}></i> {props.name}</button>
    );
}

export default ButtonSocialMedia;