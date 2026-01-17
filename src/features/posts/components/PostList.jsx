import PostCard from './PostCard'

const PostList = ({ posts }) => (
  <div className="grid">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
)

export default PostList
