import { Link, NavLink } from 'react-router-dom'
import { FiEdit3, FiHome, FiMoon, FiSun } from 'react-icons/fi'

const Header = ({ theme, onToggleTheme }) => (
  <header className="header">
    <div className="container header__content">
      <div>
        <Link className="logo" to="/">
          BlogCraft
        </Link>
      </div>
      <nav className="nav">
        <NavLink to="/" end>
          <FiHome />
          Головна
        </NavLink>
        <NavLink to="/posts/new">
          <FiEdit3 />
          Новий пост
        </NavLink>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label="Змінити тему"
          title="Змінити тему"
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
      </nav>
    </div>
  </header>
)

export default Header
