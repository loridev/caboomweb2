function Video(props) {

    return (
        <video autoPlay="autoplay" muted="muted" loop="loop" className={props.className}>

            <source src="/videos/mapacheMobile.mp4" type="video/mp4" media="all and (max-width: 648px)"></source>
            <source src="/videos/mapache.mp4" type="video/mp4"></source>
            {props.children}
        </video>
    );
}

export default Video;