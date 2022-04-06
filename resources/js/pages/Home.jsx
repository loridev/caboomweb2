import { useEffect, useState } from "react";
import Background from "../components/Background/Background";

function Home() {
    /*
    const [src, setSrc] = useState('/videos/mapache.mp4');

    const mediaQuery = window.matchMedia('(min-width: 648px)');

    const handleWindowChange = (ev) => {
        debugger
        if (ev.matches) {
            console.log('grande');
            setSrc('/videos/mapache.mp4');
        } else {
            console.log('pequeño');
            setSrc('/videos/mapacheMobile.mp4');
        }
        console.log(src);
    }
    
    useEffect(() => {
        mediaQuery.addEventListener('change', handleWindowChange);
        handleWindowChange(mediaQuery);
    }, [src]);
    */
    return (
        <Background text="CARLOS EL BOMBAS" buttonText="Try it Now"/>
    );
}

export default Home;
