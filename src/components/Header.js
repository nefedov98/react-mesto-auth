import logo from '../images/logo.svg';
import { Link, withRouter, useLocation } from 'react-router-dom';



function Header() {

    const location = useLocation()

    return (
    <header className="header">
        <a href="#" target="_self"><img src={logo} className="logo" alt="логотип" /></a>
        {
            location.pathname === '/sign-up' ? 
            <Link className='header__link' to='/sign-in'>Регистрация</Link> :
            <Link className='header__link' to='/sign-up'>Войти</Link>
          }
    </header>);
  }
  
  export default Header;