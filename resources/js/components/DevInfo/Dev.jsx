function Dev(props) {
    return(
        <div>
            <img src={props.src} alt={props.name} />
            <h3>{props.name}, {props.age}</h3>
            <p>{props.description}</p>
        </div>
    );
}

export default Dev;