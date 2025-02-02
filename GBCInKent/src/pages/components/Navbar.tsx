import { Link } from 'react-router-dom';
import './Navbar.css';
import GBCLogo from '../../assets/GalileeLogo.png';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-icon">
                <Link to="/">
                    <img src={GBCLogo} alt="icon" id="navbar-logo" />
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="/about" className="navbar-link">About Us</Link></li>
                <li><Link to="/events" className="navbar-link">Events</Link></li>
                <li><Link to="/staff" className="navbar-link">Staff</Link></li>
                <li><Link to="/sermons" className="navbar-link">Sermons</Link></li>
                <li><a href="/" target="_blank" rel="noopener noreferrer" className="navbar-link">Give</a></li>
            </ul>
        </nav>
    );
}
