import logo from '../images/logo.svg';


function Header() {
    return (
    <header className="header">
        <a href="#" target="_self"><img src={logo} className="logo" alt="логотип" /></a>
    </header>);
  }
  
  export default Header;