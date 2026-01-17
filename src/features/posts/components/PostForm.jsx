import { useEffect, useMemo, useState } from 'react'

const splitTags = (value) =>
  value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

const PostForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState(initialValues.title)
  const [excerpt, setExcerpt] = useState(initialValues.excerpt)
  const [content, setContent] = useState(initialValues.content)
  const [author, setAuthor] = useState(initialValues.author)
  const [tagsInput, setTagsInput] = useState(initialValues.tags.join(', '))

  useEffect(() => {
    setTitle(initialValues.title)
    setExcerpt(initialValues.excerpt)
    setContent(initialValues.content)
    setAuthor(initialValues.author)
    setTagsInput(initialValues.tags.join(', '))
  }, [initialValues])

  const isValid = useMemo(
    () => title.trim() && excerpt.trim() && content.trim() && author.trim(),
    [title, excerpt, content, author],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid) return

    onSubmit({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim(),
      tags: splitTags(tagsInput),
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__grid">
        <label className="field">
          Заголовок
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Назва статті"
            required
          />
        </label>
        <label className="field">
          Автор
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Ваше ім'я"
            required
          />
        </label>
      </div>
      <label className="field">
        Короткий опис
        <textarea
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          placeholder="2-3 речення про статтю"
          rows={3}
          required
        />
      </label>
      <label className="field">
        Контент
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Основний текст"
          rows={8}
          required
        />
      </label>
      <label className="field">
        Теги (через кому)
        <input
          type="text"
          value={tagsInput}
          onChange={(event) => setTagsInput(event.target.value)}
          placeholder="react, redux, vite"
        />
      </label>
      <div className="form__actions">
        <button className="button button--primary" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
    </form>
  )
}

export default PostForm
