import { csrfFetch } from "./csrf"


// TYPE CONSTANTS

const GET_LIKES = "likes/getLikes"
const ADD_LIKE = "likes/addLikes"
const REMOVE_LIKE = "likes/removeLikes"


// ACTION CREATORS

const getLikes = (likes) => {
    return { type: GET_LIKES, likes }
}

const addLike = (like) => {
    return { type: ADD_LIKE, like }
}

const removeLike = (like) => {
    return { type: REMOVE_LIKE, like }
}


// THUNK ACTION CREATOR

export const thunkGetLikes = () => async (dispatch) => {
    const res = await csrfFetch('/api/likes')

    if (res.ok) {
        const likes = await res.json()
        dispatch(getLikes(likes))
        return res
    } else {
        const errors = res.json()
        return errors
    }
}

export const thunkGetPostLikes = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes`)

    if (res.ok) {
        const likes = await res.json()
        dispatch(getLikes(likes))
        return res
    } else {
        const errors = res.json()
        return errors
    }
}

export const thunkAddLike = (like, postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(like)
    })

    if (res.ok) {
        const data = await res.json()
        await dispatch(addLike(like))
        return data
    } else {
        const errors = res.json()
        return errors
    }
}

export const thunkRemoveLike = (likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: "DELETE"
    })

    dispatch(removeLike(likeId))
    return res
}


const initialState = { allLikes: {} }

const likesReducer = (state = initialState, action) => {
    let newState

    switch(action.type) {
        case GET_LIKES:
            newState = { ...state, allLikes: {} }
            action.likes.forEach((like) => {
                newState.allLikes[like.id] = like
            })

            return newState

        case ADD_LIKE:
            newState = {
                ...state,
                allLikes: { ...state.allLikes }
            }
            newState.allLikes[action.like.id] = action.like
            return newState

        case REMOVE_LIKE:
            newState = {
                ...state,
                allLikes: { ...state.allLikes }
            }
            delete newState.allLikes[action.likeId]
            return newState

        default:
            return state
    }
}

export default likesReducer
