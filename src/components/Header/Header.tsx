import logo from '../../media/logo.svg';

export const Header = () => {
    return (
            <header className="header">
                <a href="/music" className="header__logo link">
                    <img src={logo} alt="logo"/>
                </a>
                <nav className="header__nav">
                    <a href="/music" className="header__link link">Music</a>
                    <a href="/search" className="header__link link">Search</a>
                </nav>  
            </header>
    )
}