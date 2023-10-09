import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/post"


export const UpdatePostModal = ({ post }) => {
    const [media, setMedia] = useState(post.media)
    const [body, setBody] = useState(post.body)
    const [errors, setErrors] = useState()

    const dispatch = useDispatch()

    const { closeModal } = useModal()


    // console.log("CreatePost media: ", media)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch( postsActions.thunkUpdatePost( { media, body }, post.id) )
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
            const errors = {}
            // if (!body) errors.body = "Post body needs content!"
            // if (
            //     media &&
            //     !media.endsWith("jpg") &&
            //     !media.endsWith("jpeg") &&
            //     !media.endsWith("png")
            //     ) errors.media = "Media URL must end in .png, .jpg, or .jpeg";
            // setErrors(errors)
            dispatch(postsActions.thunkGetPostInfo(post.id))
        }, [dispatch, media, body])

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
                {errors && <div className="bottom-error">Post needs at least one character</div>}
                <button type="submit">Update Post</button>
            </form>
        </div>
    )
}
