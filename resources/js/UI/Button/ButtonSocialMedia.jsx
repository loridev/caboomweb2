import clases from "./styles/ButtonSocialMedia.module.css";

function ButtonSocialMedia(props) {
    return(
        <a href={props.href} target="_blank" >
            <button className={clases.button}><i className={`fa fa-${props.name}`}></i> {props.name}</button>
        </a>
    );
}

export default ButtonSocialMedia;