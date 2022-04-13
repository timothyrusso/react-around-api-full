import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ loggedIn, handleLogout, userEmail, toggleMenu, toggleNav }) => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const location = useLocation();

    let linkText;

    const pathDefinition = () => {
        switch (location.pathname) {
            case "/signin":
                linkText = "Sign up";
                return "/signup"
            case "/signup":
                linkText = "Log in";
                return "/signin"
            case "/":
                linkText = "Log out";
                return "/signin"
            default:
                return "/"
        }
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => window.removeEventListener('resize', changeWidth)
    }, [])

    return (
        <>
            {loggedIn && toggleMenu && screenWidth < 552 &&
                <div className="mobile-navbar">
                    <p className={`header__email ${toggleMenu ? "header__email_type_mobile" : ""}`}>{loggedIn && userEmail}</p>
                    <Link to={pathDefinition()} className={`header__link ${loggedIn ? "header__link_type_logout" : ""}`} onClick={loggedIn && handleLogout}>{linkText}</Link>
                </div>}
            <header className="header">
                <img src={logo} alt="Logo representing the Around the US project" className="logo" />
                <div className={`header__wrapper ${loggedIn ? "header__wrapper_type_login" : ""}`}>
                    <p className="header__email">{loggedIn && userEmail}</p>
                    <Link to={pathDefinition()} className={`header__link ${loggedIn ? "header__link_type_logout" : ""}`} onClick={loggedIn && handleLogout}>{linkText}</Link>
                </div>
                {loggedIn && <button aria-label="burger" type="button" className={`burger-button ${toggleMenu ? "burger-button_type_open" : ""}`} onClick={toggleNav}></button>}
            </header>
        </>
    )
}

export default Header;