import { Link } from 'react-router-dom'
import { formatDate } from '../lib/helpers'

const PostCard = ({ post }) => (
  <Link className="card-link" to={`/posts/${post.id}`}>
    <article className="card">
      <div className="card__meta">
        <span>{post.author}</span>
        <span>•</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>
      <h3 className="card__title">{post.title}</h3>
      <p className="card__excerpt">{post.excerpt}</p>
      <div className="card__tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  </Link>
)

export default PostCard
