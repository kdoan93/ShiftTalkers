import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/post"


export const CreatePostModal = () => {
    const [media, setMedia] = useState("")
    const [body, setBody] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

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

        setErrors(errors)
    }, [dispatch, media, body])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch(
                postsActions.thunkCreatePost({ media, body })
            )
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
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Media</label>
                    <input
                        type="url"
                        value={media}
                        onChange={(e) => setMedia(e.target.value)}
                        placeholder="Add a pic with your post!"
                    />
                </div>
                {/* <input
                    type="url"
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                    placeholder="Post a pic with your post!"
                /> */}
                {/* {errors.media && submitted && <p>{errors.media}</p>} */}
                <textarea
                    type="text"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Leave a message ShiftTalker"
                ></textarea>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}
