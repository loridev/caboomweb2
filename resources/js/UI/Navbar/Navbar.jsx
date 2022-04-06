import { useState } from "react";
import { Link } from "react-router-dom";
// import { ReactComponent as Logo } from "/images/logo.svg";
// import { ReactComponent as HamIcon } from "/images/hamburger.svg";
// import { ReactComponent as CloseIcon } from "/images/close.svg";
import classes from './styles/Navbar.module.css';

function Navbar(props) {
    const { children } = props;
    const [active, setActive] = useState(false);
    const closeMenu = (ev) => {
        ev.target.localName === 'li' || ev.target.localName === 'a' ? setActive(false) : setActive(true);
    };
    const toggleMenu = () => setActive(!active);

    return (
        <div className={classes.header}>
            <div className={classes.logoNav}>
                <div className={classes.logoContainer}>
                    <Link to="/">
                        <img src="/images/logo.svg" className={classes.logo} />
                    </Link>
                </div>
            </div>
            <ul onClick={closeMenu} 
            className={active ? `${classes.navOptions} ${classes.active}` : `${classes.navOptions}`}
            >
                {children}
            </ul>
            <div className={classes.mobileMenu} onClick={toggleMenu}>
                {active ? <img src="/images/close.svg" className={classes.navIcon} /> : 
                <img src="/images/hamburger.svg" className={classes.navIcon} />}
            </div>
        </div>
    );
}

export default Navbar;