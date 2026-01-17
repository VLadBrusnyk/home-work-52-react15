import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsApi } from '../api/postsApi'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const data = await postsApi.fetchAll()
    return data
})

export const fetchPostById = createAsyncThunk(
    'posts/fetchPostById',
    async (id) => {
        const data = await postsApi.fetchById(id)
        return data
    },
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (payload) => {
        const data = await postsApi.create(payload)
        return data
    },
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ id, changes }) => {
        const data = await postsApi.update(id, changes)
        return data
    },
)

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const data = await postsApi.remove(id)
    return data
})

export const addComment = createAsyncThunk(
    'posts/addComment',
    async ({ postId, comment }) => {
        const data = await postsApi.addComment(postId, comment)
        return data
    },
)

export const deleteComment = createAsyncThunk(
    'posts/deleteComment',
    async ({ postId, commentId }) => {
        const data = await postsApi.removeComment(postId, commentId)
        return data
    },
)

export const toggleCommentLike = createAsyncThunk(
    'posts/toggleCommentLike',
    async ({ postId, commentId }) => {
        const data = await postsApi.toggleCommentLike(postId, commentId)
        return data
    },
)

const initialState = {
    items: [],
    selected: null,
    status: 'idle',
    error: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearSelected(state) {
            state.selected = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error?.message || 'Помилка завантаження'
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.selected = action.payload
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.items = [action.payload, ...state.items]
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload) return
                state.items = state.items.map((post) =>
                    post.id === action.payload.id ? action.payload : post,
                )
                if (state.selected?.id === action.payload.id) {
                    state.selected = action.payload
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter((post) => post.id !== action.payload)
            })
            .addCase(addComment.fulfilled, (state, action) => {
                if (!action.payload) return
                state.items = state.items.map((post) =>
                    post.id === action.payload.id ? action.payload : post,
                )
                if (state.selected?.id === action.payload.id) {
                    state.selected = action.payload
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                if (!action.payload) return
                state.items = state.items.map((post) =>
                    post.id === action.payload.id ? action.payload : post,
                )
                if (state.selected?.id === action.payload.id) {
                    state.selected = action.payload
                }
            })
            .addCase(toggleCommentLike.fulfilled, (state, action) => {
                if (!action.payload) return
                state.items = state.items.map((post) =>
                    post.id === action.payload.id ? action.payload : post,
                )
                if (state.selected?.id === action.payload.id) {
                    state.selected = action.payload
                }
            })
    },
})

export const { clearSelected } = postsSlice.actions

export const selectPosts = (state) => state.posts.items
export const selectPostsStatus = (state) => state.posts.status
export const selectPostsError = (state) => state.posts.error
export const selectSelectedPost = (state) => state.posts.selected

export default postsSlice.reducer
