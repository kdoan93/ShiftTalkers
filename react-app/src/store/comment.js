
export const thunkGetPostComments = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`)

    if (res.ok) {
        const comments = await res.json()
        dispatch(getComments(comments))
        return comments
    } else {
        const errors = await res.json()
        return errors
    }
}
