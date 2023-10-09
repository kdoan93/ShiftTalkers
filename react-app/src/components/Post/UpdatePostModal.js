import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/post"


export const UpdatePostModal = ({ post }) => {
    const [media, setMedia] = useState(post.media)
    const [body, setBody] = useState(post.body)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState()

    const dispatch = useDispatch()

    const { closeModal } = useModal()


    console.log("CreatePost media: ", media)

    useEffect(() => {
        const errors = {}
        if (!body) errors.body = "Post body needs content!"
        // if (
        //     media &&
        //     !media.endsWith("jpg") &&
        //     !media.endsWith("jpeg") &&
        //     !media.endsWith("png")
        //     ) errors.media = "Media URL must end in .png, .jpg, or .jpeg";
        dispatch(postsActions.thunkGetPostInfo(post.id))
        setErrors(errors)
    }, [dispatch, media, body])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch( postsActions.thunkUpdatePost( { media, body }, post.id) )
            setSubmitted(true)
            closeModal()
        } catch (errors) {
            if (errors) {
                setErrors(errors)
                setSubmitted(true)
            }
        }
    }

    return (
        <div className="create-post-container">
            <h2>Update your Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="url"
                        value={media}
                        onChange={(e) => setMedia(e.target.value)}
                        placeholder="Update your media?"
                    />
                </div>
                <textarea
                    type="text"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Leave a message ShiftTalker"
                ></textarea>
                <button type="submit">Update Post</button>
            </form>
        </div>
    )
}
