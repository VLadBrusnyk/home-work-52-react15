import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiMessageSquare, FiThumbsUp, FiTrash2 } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  addComment,
  clearSelected,
  deletePost,
  deleteComment,
  fetchPostById,
  selectSelectedPost,
  toggleCommentLike,
} from '../features/posts'
import { formatDate } from '../features/posts/lib/helpers'

const PostPage = () => {
  const { postId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const post = useAppSelector(selectSelectedPost)
  const [commentAuthor, setCommentAuthor] = useState('')
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId))
    }
    return () => {
      dispatch(clearSelected())
    }
  }, [dispatch, postId])

  const handleDelete = async () => {
    if (!postId) return
    await dispatch(deletePost(postId))
    navigate('/')
  }

  if (!post) {
    return (
      <div className="container">
        <p>Пост не знайдено.</p>
      </div>
    )
  }

  const comments = post.comments ?? []

  const handleAddComment = async (event) => {
    event.preventDefault()
    if (!postId) return
    if (!commentAuthor.trim() || !commentText.trim()) return
    await dispatch(
      addComment({
        postId,
        comment: {
          author: commentAuthor.trim(),
          text: commentText.trim(),
        },
      }),
    )
    setCommentAuthor('')
    setCommentText('')
  }

  const handleDeleteComment = async (commentId) => {
    if (!postId) return
    await dispatch(deleteComment({ postId, commentId }))
  }

  const handleToggleLike = async (commentId) => {
    if (!postId) return
    await dispatch(toggleCommentLike({ postId, commentId }))
  }

  return (
    <div className="container stack">
      <div className="post-header">
        <div>
          <p className="post-meta">
            {post.author} • {formatDate(post.createdAt)}
          </p>
          <h1>{post.title}</h1>
        </div>
        <div className="post-actions">
          <Link className="button button--ghost" to={`/posts/${post.id}/edit`}>
            Редагувати
          </Link>
          <button className="button button--danger" onClick={handleDelete}>
            Видалити
          </button>
        </div>
      </div>
      <p className="post-excerpt">{post.excerpt}</p>
      <article className="post-content">{post.content}</article>
      <div className="card__tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <section className="comments">
        <div className="comments__header">
          <h2>Коментарі</h2>
          <span className="comments__count">
            <FiMessageSquare /> {comments.length}
          </span>
        </div>
        <form className="comment-form" onSubmit={handleAddComment}>
          <div className="form__grid">
            <label className="field">
              Імʼя
              <input
                type="text"
                value={commentAuthor}
                onChange={(event) => setCommentAuthor(event.target.value)}
                placeholder="Ваше імʼя"
                required
              />
            </label>
          </div>
          <label className="field">
            Коментар
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Напишіть коментар..."
              rows={4}
              required
            />
          </label>
          <div className="form__actions">
            <button className="button button--primary" type="submit">
              Додати коментар
            </button>
          </div>
        </form>

        <div className="comments__list">
          {comments.length ? (
            comments.map((comment) => (
              <article key={comment.id} className="comment-card">
                <div>
                  <p className="comment-meta">
                    {comment.author} • {formatDate(comment.createdAt)}
                  </p>
                  <p className="comment-text">{comment.text}</p>
                </div>
                <div className="comment-actions">
                  <button
                    type="button"
                    className={`comment-like ${comment.liked ? 'is-active' : ''}`}
                    onClick={() => handleToggleLike(comment.id)}
                  >
                    <FiThumbsUp /> {comment.likes}
                  </button>
                  <button
                    type="button"
                    className="comment-delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <FiTrash2 /> Видалити
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="comment-empty">Поки що немає коментарів.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default PostPage
