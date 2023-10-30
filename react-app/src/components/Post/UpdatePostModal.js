import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/post"
import "./PostModal.css"


export const UpdatePostModal = ({ post }) => {
    const [media, setMedia] = useState(post.media)
    const [body, setBody] = useState(post.body)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch( postsActions.thunkUpdatePost( { media, body }, post.id) )
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
        dispatch(postsActions.thunkGetPostInfo(post.id))
    }, [dispatch, media.length, body.length])

    return (
        <div className="create-post-container">
            <h2 className="post-modal-title">Update your Post</h2>
            <form className="post-modal-form" onSubmit={handleSubmit}>
                <input
                    className="post-modal-input"
                    type="url"
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                    placeholder="Update your media?"
                />
                <textarea
                    className="post-modal-textarea"
                    type="text"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Leave a message ShiftTalker"
                ></textarea>
                {errors && submitted && <div className="bottom-error post-modal-error">Post needs at least one character</div>}
                <button className="post-modal-button" type="submit">Update Post</button>
            </form>
        </div>
    )
}
