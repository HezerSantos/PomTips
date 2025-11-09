import { Link } from 'react-router-dom'
import logo from '../../assets/images/Logo.png'
const Footer: React.FC = () => {
    return(
        <>
            <footer className="page-section">
                <div className="page-section__child footer">
                    <div className='footer-header'>
                        <img src={logo} alt="" />
                        <p>PomTips</p>
                        <p>We nailed it!</p>
                    </div>
                    <div className='footer-content'>
                        <p>Quick Links</p>
                        <ul>
                            <li>
                                <Link to={""}>Home</Link>
                            </li>
                            <li>
                                <Link to={""}>Services</Link>
                            </li>
                            <li>
                                <Link to={""}>FAQ</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-content'>
                        <p>Support Links</p>
                        <ul>
                            <li>
                                <Link to={""}>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to={""}>Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer