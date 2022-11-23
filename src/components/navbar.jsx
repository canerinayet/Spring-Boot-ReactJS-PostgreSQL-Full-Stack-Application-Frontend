
import "../navbar.css";
import resim1 from '../components/acibadems.png';
import { Link } from "react-router-dom";



function Navbar() {
 
  
  
  return (
    <nav className="nav">
      <img src={resim1} className="resim"  alt="logo"></img>
      <link className="nav__brand">
        
      </link>
      <ul className="nav__menu">
        <li className="nav__item">
        <Link to="/" className="nav__link">
            Anasayfa
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Hakkında
          </Link>
        </li>
        <li className="nav__item">
          <a href="/" className="nav__link">
            Bayilerimiz
          </a>
        </li>
        <li className="nav__item">
          <a href="/" className="nav__link">
            İletişim
          </a>
        </li>
      </ul>
     
    </nav>
  );
}

export default Navbar;