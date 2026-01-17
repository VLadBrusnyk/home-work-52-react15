import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="container stack">
    <h1>Сторінку не знайдено</h1>
    <p>Спробуйте повернутися на головну.</p>
    <Link className="button button--primary" to="/">
      На головну
    </Link>
  </div>
)

export default NotFoundPage
