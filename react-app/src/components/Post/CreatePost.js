import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/post"
import "./Post.css"


export const CreatePostModal = () => {
    const [media, setMedia] = useState("")
    const [body, setBody] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()

    const { closeModal } = useModal()

    useEffect(() => {
        const errors = {}
        if (
            media &&
            !media.includes(".jpg") &&
            !media.includes(".jpeg") &&
            !media.includes(".png")
        ) errors.media = "Image URL must end in .png, .jpg, or .jpeg";
        setErrors(errors)

        if (!body) errors.body = "Post needs at least one character"

        if (errors) console.log("CreatePostModal errors: ", errors)

    }, [dispatch, media.length, body])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        if (!Object.values(errors).length) {
            await dispatch( postsActions.thunkCreatePost({ media, body }) )
            setSubmitted(true)
            closeModal()
        }

        if (errors) {
            setErrors(errors)
            setSubmitted(true)
        }
    }

    return (
        <div className="create-post-container">
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="url"
                        value={media}
                        onChange={(e) => setMedia(e.target.value)}
                        placeholder="Add a pic with your post!"
                    />
                </div>
                {errors.media && submitted && <p>{errors.media}</p>}
                <textarea
                    type="text"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Leave a message ShiftTalker"
                ></textarea>
                {errors.body && submitted && <p>{errors.body}</p>}
                <button type="submit">Post</button>
            </form>
        </div>
    )
}
