import clases from "./styles/Video.module.css";

function Video(props) {

    return (
        <>
            <video autoPlay="autoplay" muted="muted" loop="loop" className={`${props.className} ${clases.desktop}`}>

                <source src="/videos/mapache.mp4" type="video/mp4"></source>
                {props.children}
                </video>

            <video autoPlay="autoplay" muted="muted" loop="loop" className={`${props.className} ${clases.mobile}`}>

                <source src="/videos/mapacheMobile.mp4" type="video/mp4"></source>
                {props.children}
            </video>
        </>
    );
}

export default Video;
