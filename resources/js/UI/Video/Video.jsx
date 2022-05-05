import clases from "./styles/Video.module.css";

function Video(props) {

    return (
        <>
            <video autoPlay="autoplay" muted="muted" loop="loop" className={`${props.className} ${clases.desktop}`}>

                <source src="/videos/carlosDesktop.mp4" type="video/mp4"></source>
                {props.children}
                </video>

            <video autoPlay="autoplay" muted="muted" loop="loop" className={`${props.className} ${clases.mobile}`}>

                <source src="/videos/carlosMobile.mp4" type="video/mp4"></source>
                {props.children}
            </video>
        </>
    );
}

export default Video;
