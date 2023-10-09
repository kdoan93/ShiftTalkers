import { csrfFetch } from "./csrf"

// TYPE CONSTANTS

const GET_COMMENTS = "comments/getComments"
const GET_COMMENT = "comments/getComment"
const CREATE_COMMENT = "comments/createComment"
const UPDATE_COMMENT = "comments/updateComment"
const DELETE_COMMENT = "comments/deleteComment"

// ACTION CREATORS

const getComments = (comments) => {
    return { type: GET_COMMENTS, comments }
}

const getComment = (comment) => {
    return { type: GET_COMMENT, comment }
}

const createComment = (comment) => {
    return { type: CREATE_COMMENT, comment }
}

const updateComment = (comment) => {
    return { type: UPDATE_COMMENT, comment }
}

const deleteComment = (commentId) => {
    return { type: DELETE_COMMENT, commentId }
}

// THUNK ACTION CREATOR

export const thunkGetComments = () => async (dispatch) => {
    const res = await csrfFetch('/api/comments')

    if (res.ok) {
        const comments = await res.json()
        dispatch(getComments(comments))
        return res
    } else {
        const errors = res.json()
        return errors
    }
}

export const thunkGetPostComments = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`)

    if (res.ok) {
        const comments = await res.json()
        dispatch(getComments(comments))
        return res
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkGetUsersComments = () => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/current`)

    if (res.ok) {
        const comments = await res.json()
        dispatch(getComments(comments))
        return res
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkCreateComment = (comment, postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        await dispatch(createComment(comment))
        return data
    } else {
        const errors = res.json()
        return errors
    }
}

export const thunkUpdateComment = (comment, commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateComment(data))
        return data
    } else {
        const errors = res.json()
        return errors
    }
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    dispatch(deleteComment(commentId))
    return res
}

const initialState = { allComments: {}, singleComment: {} };

const commentsReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_COMMENTS:
            newState = { ...state, allComments: {} }
            action.comments.forEach((comment) => {
                newState.allComments[comment.id] = comment
            })
            return newState

        case GET_COMMENT:
            newState = { ...state, comment: {} }
            newState.comment = action.comment
            return newState

        case CREATE_COMMENT:
            newState = {
                ...state,
                allComments: { ...state.allComments },
                singleComment: { ...action.comment }
            }
            newState.allComments[action.comment.id] = action.comment
            return newState

        case UPDATE_COMMENT:
            newState = {
                ...state,
                allComments: {},
                singleComment: { ...state.singleComment }
            }
            newState.singleComment = {
                ...newState.singleComment,
                ...action.comment
            }
            return newState

        case DELETE_COMMENT:
            newState = {
                ...state,
                allComments: { ...state.allComments },
                singleComment: {}
            }
            delete newState.allComments[action.commentId]
            return newState

        default:
            return state
    }
}

export default commentsReducer
