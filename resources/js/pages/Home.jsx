import {useContext, useEffect, useState} from "react";
import Background from "../components/Background/Background";
import AuthContext from "../context/AuthContext";

function Home() {
    const ctx = useContext(AuthContext);
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
    */

    useEffect(() => {
        if (localStorage.getItem('apitoken')) {
            ctx.setToken(localStorage.getItem('apitoken'));
        }
    }, []);
    return (
        <Background text="CARLOS EL BOMBAS" buttonText="Try it now"/>
    );
}

export default Home;
