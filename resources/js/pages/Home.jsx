import {useContext, useEffect, useState} from "react";
import Background from "../components/Background/Background";
import Idea from "../components/Idea/Idea";
import AuthContext from "../context/AuthContext";

function Home() {
    const ctx = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem('apitoken')) {
            ctx.setToken(localStorage.getItem('apitoken'));
        }
    }, []);

    return (
        <>
            <Background text="CARLOS EL BOMBAS" buttonText="Try it now"/>
            <Idea/>
        </>
    );
}

export default Home;
