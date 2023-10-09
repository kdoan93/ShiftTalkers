import { csrfFetch } from "./csrf";

// TYPE CONSTANTS

const GET_POSTS = "posts/getPosts"
const GET_POST = "posts/getPost"
const CREATE_POST = "posts/createPost"
const UPDATE_POST = "posts/updatePost"
const DELETE_POST = "posts/deletePost"

// ACTION CREATORS

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const getPost = (post) => {
    return {
        type: GET_POST,
        post
    }
}

const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}

const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}


// THUNK ACTION CREATOR

export const thunkGetPosts = () => async (dispatch) => {
    const res = await csrfFetch("/api/posts/")

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

export const thunkGetUserPosts = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/posts`)

    if (res.ok) {
        const posts = await res.json()
        dispatch(getPosts(posts))
        return res
    } else {
        const errors = res.json()
        return errors
    }
}

export const thunkCreatePost = (post) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })

    if (res.ok) {
        const data = await res.json()
        await dispatch(createPost(post))
        return data
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkUpdatePost = (post, postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(updatePost(data));
        return data;
    } else {
        const errors = await res.json()
        return errors;
    }
};

export const thunkDeletePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: "DELETE"
    })

    dispatch(deletePost(postId))
    return res
}

const initialState = { allPosts: {}, singlePost: {} };

const postsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_POSTS:
            newState = { ...state, allPosts: {} };
            // console.log("store/post action: ", action.post)
            // console.log("store/post action.posts: ", action.posts)
            action.posts.forEach((post) => {
                newState.allPosts[post.id] = post
            })
            return newState

        case GET_POST:
            newState = { ...state, post: {} };
            newState.post = action.post
            return newState;

        case CREATE_POST:
            newState = {
                ...state,
                allPosts: { ...state.allPosts },
                singlePost: { ...action.post }
            };
            newState.allPosts[action.post.id] = action.post;
            return newState

        case UPDATE_POST:
            newState = {
                ...state,
                allPosts: {},
                singlePost: { ...state.singlePost }
            }
            newState.singlePost = {
                ...newState.singlePost,
                ...action.post
            }
            return newState

        case DELETE_POST:
            newState = {
                ...state,
                allPosts: { ...state.allPosts },
                singlePost: {}
            }
            delete newState.allPosts[action.postId];
            return newState

        default:
            return state
    }
}

export default postsReducer;
