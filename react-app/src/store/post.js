import { csrfFetch } from "./csrf";

// TYPE CONSTANTS

const GET_POSTS = "posts/getPosts"
const GET_POST = "posts/getPost"
const CREATE_POST = "posts/createPost"
const UPDATE_POST = "posts/updatePost"
const DELETE_POST = "posts/deletePost"

// ACTION CREATORS

const getPosts = (posts) => {
    return { type: GET_POSTS, posts }
}

const getPost = (post) => {
    return { type: GET_POST, post }
}

const createPost = (post) => {
    return { type: UPDATE_POST, post }
}

const deletePost = (postId) => {
    return { type: DELETE_POST, postId }
}


// THUNK ACTION CREATOR

export const thunkGetPosts = () => async (dispatch) => {
    const res = await csrfFetch("/api/posts")

    if (res.ok) {
        const posts = await res.json()
        dispatch(getPosts(posts))
        return res
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkGetPostInfo = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`)

    if (res.ok) {
        const post = await res.json()
        dispatch(getPost(post))
        return res
    } else {
        const errors = await res.json()
        return errors
    }
}

