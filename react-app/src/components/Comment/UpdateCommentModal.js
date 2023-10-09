import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentsActions from "../../store/comment"


export const UpdateCommentModal = ({ comment }) => {
    const [updateComment, setUpdateComment] = useState(comment.comment)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()

    const { closeModal } = useModal()

    // console.log("CreateComment media: ", updateComment)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch( commentsActions.thunkUpdateComment( {comment: updateComment}, comment.id) )
            closeModal()
        } catch (error) {
            if (error) {
                const data = await error.json()
                setErrors(data.errors)
                return data
            }
        }
    }

    useEffect(() => {
        // const errors = {}
        // if (!updateComment) errors.updateComment = "Comment must have at least one character!"
        // setErrors(errors)
        dispatch(commentsActions.thunkGetComment(comment.id))
    }, [dispatch, updateComment])

    return (
        <div className="create-comment-container">
            <h2>Update your Comment</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={updateComment}
                    onChange={e => setUpdateComment(e.target.value)}
                    placeholder="Update your comment?"
                ></textarea>
                {errors && <div className="bottom-error">Comment needs at least one character</div>}
                <button type="submit">Update Comment</button>
            </form>
        </div>
    )
}
