import clases from "./styles/ImageContainer.module.css";

function ImageContainer(props){
    return(
        <div className={clases.container}>
            {props.children}
        </div>
    );
}

export default ImageContainer;