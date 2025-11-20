import React from "react"
import { Link } from "react-router-dom"
import logo from '../../assets/images/Logo.png'

const Logo: React.FC = () => {
    return(
        <>
            <div className="navigation-logo">
                <Link to="/">
                    <img src={logo} alt="" className="page-logo"/>
                    <p>PomTips</p>
                </Link>
            </div>
        </>
    )
}


const NavigationLinks: React.FC = () => {
    return(
        <div className="navigation-links">
            <Link to={"/"}>
                Home
            </Link>
            <Link to={"/about"}>
                About
            </Link>
            <Link to={"/services"}>
                Services
            </Link>
            <Link to={"/book"}>
                Book
            </Link>
        </div>
    )
}

const Navigation: React.FC = () => {
    return(
        <>
            <nav className="page-section">
                <div className="page-section__child navigation">
                    <Logo />
                    <NavigationLinks />
                    <Link to={"/book"}>Book Now</Link>
                </div>
            </nav>
        </>
    )
}

export default Navigation