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
            <Link to={""}>
                Home
            </Link>
            <Link to={""}>
                About
            </Link>
            <Link to={""}>
                Services
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
                    <Link to={""}>Book Now</Link>
                </div>
            </nav>
        </>
    )
}

export default Navigation