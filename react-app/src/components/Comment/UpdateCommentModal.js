import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentsActions from "../../store/comment"
import "./CommentModal.css"


export const UpdateCommentModal = ({ comment }) => {
    const [updateComment, setUpdateComment] = useState(comment.comment)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch()

    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch( commentsActions.thunkUpdateComment( {comment: updateComment}, comment.id) )
            setSubmitted(true)
            closeModal()
        } catch (error) {
            if (error) {
                const data = await error.json()
                setErrors(data.errors)
                setSubmitted(true)
                return data
            }
        }
    }

    useEffect(() => {
        setSubmitted(false)
        dispatch(commentsActions.thunkGetComment(comment.id))
    }, [dispatch, updateComment, comment.id])

    return (
        <div className="create-comment-container">
            <h2 className="comment-modal-title">Update your Comment</h2>
            <form className="comment-modal-form" onSubmit={handleSubmit}>
                <textarea
                    className="comment-modal-textarea"
                    type="text"
                    value={updateComment}
                    onChange={e => setUpdateComment(e.target.value)}
                    placeholder="Update your comment?"
                ></textarea>
                {errors && submitted && <div className="bottom-error comment-modal-error">Comment needs at least one character</div>}
                <button className="comment-modal-button" type="submit">Update Comment</button>
            </form>
        </div>
    )
}
