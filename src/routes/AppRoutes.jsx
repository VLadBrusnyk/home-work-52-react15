import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PostPage from '../pages/PostPage'
import EditorPage from '../pages/EditorPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/posts/new" element={<EditorPage mode="create" />} />
    <Route path="/posts/:postId" element={<PostPage />} />
    <Route path="/posts/:postId/edit" element={<EditorPage mode="edit" />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default AppRoutes
