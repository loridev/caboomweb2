import {useContext, useEffect, useState} from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import Background from "../components/Background/Background";
import FollowUs from "../components/FollowUs/FollowUs";
import Idea from "../components/Idea/Idea";
import AuthContext from "../context/AuthContext";
import clases from "./styles/Home.module.css";

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
            <Idea className={clases.container} />
            <AboutUs className={clases.container} />
            <FollowUs className={clases.container} />
        </>
    );
}

export default Home;
