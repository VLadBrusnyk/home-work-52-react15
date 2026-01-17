import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
  PostList,
} from '../features/posts'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectPosts)
  const status = useAppSelector(selectPostsStatus)
  const error = useAppSelector(selectPostsError)
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('')
  const [isTagOpen, setIsTagOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts],
  )

  const filtered = useMemo(() => {
    const lowerQuery = query.toLowerCase()
    return posts.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery)
      const matchesTag = tag ? post.tags.includes(tag) : true
      return matchesQuery && matchesTag
    })
  }, [posts, query, tag])

  const handleSelectTag = (value) => {
    setTag(value)
    setIsTagOpen(false)
  }

  return (
    <div className="container stack">
      <section className="hero">
        <div>
          <h1 className="hero__title">BlogCraft — сучасний блог</h1>
        </div>
        <div className="hero__stats">
          <div>
            <p className="stat__value">{posts.length}</p>
            <p className="stat__label">Постів</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel__filters">
          <input
            className="input"
            type="search"
            placeholder="Пошук постів"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div
            className="tag-select"
            tabIndex={0}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsTagOpen(false)
              }
            }}
          >
            <button
              type="button"
              className="input tag-select__trigger"
              onClick={() => setIsTagOpen((prev) => !prev)}
            >
              {tag ? `#${tag}` : 'Усі теги'}
              <span className="tag-select__icon">▾</span>
            </button>
            {isTagOpen && (
              <div className="tag-select__menu">
                <button
                  type="button"
                  className="tag tag--option"
                  onClick={() => handleSelectTag('')}
                >
                  Усі теги
                </button>
                {tags.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="tag tag--option"
                    onClick={() => handleSelectTag(item)}
                  >
                    #{item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {status === 'loading' && <p>Завантаження...</p>}
        {status === 'failed' && <p className="error">{error}</p>}
        {status === 'succeeded' &&
          (filtered.length ? (
            <PostList posts={filtered} />
          ) : (
            <p>Немає постів за вибраними фільтрами.</p>
          ))}
      </section>
    </div>
  )
}

export default HomePage
