import { FiBookOpen, FiGithub, FiMail } from 'react-icons/fi'

const Footer = () => (
  <footer className="footer">
    <div className="container footer__content">
      <div className="footer__brand">
        <p className="logo">BlogCraft</p>
        <p className="footer__desc">
          Сучасний блог про ІТ, розробку та продуктивні робочі процеси.
        </p>
      </div>
      <div className="footer__links">
        <div>
          <p className="footer__title">Розділи</p>
          <a href="/">Головна</a>
          <a href="/posts/new">Новий пост</a>
        </div>
        <div>
          <p className="footer__title">Корисне</p>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <FiBookOpen />
            React Docs
          </a>
          <a href="https://redux-toolkit.js.org" target="_blank" rel="noreferrer">
            <FiBookOpen />
            Redux Toolkit
          </a>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <FiBookOpen />
            Vite
          </a>
        </div>
        <div>
          <p className="footer__title">Контакти</p>
          <a href="mailto:hello@blogcraft.dev">
            <FiMail />
            hello@blogcraft.dev
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <FiGithub />
            GitHub
          </a>
        </div>
      </div>
    </div>
    <div className="container footer__bottom">
      <span>© 2026 BlogCraft. Усі права захищені.</span>
      <div className="footer__legal">
        <a href="/">Політика конфіденційності</a>
        <a href="/">Умови використання</a>
      </div>
    </div>
  </footer>
)

export default Footer
