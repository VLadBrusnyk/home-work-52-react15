import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearSelected,
  createPost,
  fetchPostById,
  selectSelectedPost,
  updatePost,
} from '../features/posts'
import PostForm from '../features/posts/components/PostForm'

const emptyPost = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  tags: [],
}

const EditorPage = ({ mode }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { postId } = useParams()
  const selected = useAppSelector(selectSelectedPost)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && postId) {
      dispatch(fetchPostById(postId))
    }
    return () => {
      dispatch(clearSelected())
    }
  }, [dispatch, mode, postId])

  const initialValues = useMemo(() => {
    if (mode === 'edit' && selected) {
      return {
        title: selected.title,
        excerpt: selected.excerpt,
        content: selected.content,
        author: selected.author,
        tags: selected.tags,
      }
    }
    return emptyPost
  }, [mode, selected])

  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    if (mode === 'edit' && postId) {
      const result = await dispatch(updatePost({ id: postId, changes: values }))
      setIsSubmitting(false)
      if (result.payload?.id) {
        navigate(`/posts/${result.payload.id}`)
      }
      return
    }

    const created = await dispatch(createPost(values))
    setIsSubmitting(false)
    if (created.payload?.id) {
      navigate(`/posts/${created.payload.id}`)
    }
  }

  return (
    <div className="container stack">
      <h1>{mode === 'edit' ? 'Редагування посту' : 'Новий пост'}</h1>
      <PostForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default EditorPage
