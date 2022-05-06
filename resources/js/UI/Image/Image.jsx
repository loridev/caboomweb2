function Image(props) {
    return(
        <img src={props.src} alt={props.name} className={props.className} />
    );
}

export default Image;