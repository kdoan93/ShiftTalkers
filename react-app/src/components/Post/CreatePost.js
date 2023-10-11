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
    const [goodImg, setGoodImg] = useState(true)

    const dispatch = useDispatch()

    const { closeModal } = useModal()


    // console.log("CreatePost media: ", media)

    useEffect(() => {
        // const errors = {}
        // if (
        //     media &&
        //     !media.endsWith("jpg") &&
        //     !media.endsWith("jpeg") &&
        //     !media.endsWith("png")
        // ) errors.media = "Image URL must end in .png, .jpg, or .jpeg";
        //     setErrors(errors)

        if (media) {
            // console.log("CreatePost media: ", media)
            media.endsWith("jpg") ? setGoodImg(true) : setGoodImg(false) &&
            media.endsWith("jpeg") ? setGoodImg(true) : setGoodImg(false) &&
            media.endsWith("png") ? setGoodImg(true) : setGoodImg(false) &&
            media.endsWith("gif") ? setGoodImg(true) : setGoodImg(false)
        }
        goodImg ? console.log("goodImg") : console.log("not goodImg")
        // if (goodImg) console.log("goodImg HIT")

    }, [dispatch, media, body, media.length])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        setSubmitted(true)

        if (!body) errors.body = "Body needs at least one character"

    //     if (media) {
    //         console.log("CreatePost media: ", media)
    //         media.endsWith("jpg") ? setGoodImg(true) : setGoodImg(false) &&
    //         media.endsWith("jpeg") ? setGoodImg(true) : setGoodImg(false) &&
    //         media.endsWith("png") ? setGoodImg(true) : setGoodImg(false) &&
    //         media.endsWith("gif") ? setGoodImg(true) : setGoodImg(false)
    //  } errors.media = "Image URL must end in .png, .jpg, .jpeg, or .gif";

        try {
            if (goodImg) {
                await dispatch( postsActions.thunkCreatePost({ media, body }) )
                // setSubmitted(true)
                closeModal()
            }
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
                    {/* <label>Media</label> */}
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
                {submitted && !goodImg && <p>Media must end with .png, .jpg, or .jpeg</p>}
                <textarea
                    type="text"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Leave a message ShiftTalker"
                ></textarea>
                {errors.body && <p>Message must have at least one character</p>}
                <button type="submit">Post</button>
            </form>
        </div>
    )
}
