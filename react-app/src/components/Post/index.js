// Index.js for post detail
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { thunkCreateComment } from "../../store/comment";
import { UpdatePostModal } from "./UpdatePostModal";
import { DeletePostModal } from "./DeletePostModal";
import { PostComments } from "../Comment";
import { thunkGetPostInfo } from "../../store/post";
import { PostLikes } from "../Like";
import { thunkGetLikes } from "../../store/like";
import "./Post.css"

export const PostDetail = ({ post }) => {
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.session.user)

    const postLikes = useSelector((state) => state.likes.allLikes)

    let likes = Object.values(postLikes)

    const filterLikes = likes.filter(like => like.post_id === post.id)

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let day = newDate.substring(7,10)
        return month.concat(day)
    }

    const logIn = async (e) => {
        e.preventDefault()
        alert("Please log in or sign up to like a post!")
    }

    useEffect(() => {
        setSubmitted(false)
        dispatch(thunkGetPostInfo(post.id))
    }, [dispatch, comment])

    useEffect(() => {
        dispatch(thunkGetLikes())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch(thunkCreateComment({ comment }, post.id)
            )
            setSubmitted(true)
            setComment("")
        } catch (errors) {
            if (errors) {
                setErrors(errors)
                setSubmitted(true)
            }
        }
    }

    return (
        <div className="post-details-container">
            <div className="post-upper-details">
                <div className="post-user-details">
                    <NavLink exact to={`/users/${post.user_id}`}>
                        <img className="post-profile-pic" width="100px" src={post.profile_pic} />
                    </NavLink>
                    <div className="post-user-date">
                        <p className="post-username">
                            {post.username}
                        </p>
                        <p className="post-created">
                            {lowBudgetDateConverter(post.created_at)}
                        </p>
                    </div>
                </div>
                {currentUser && currentUser.id === post.user_id ?
                    <div className="post-user-buttons">
                        <OpenModalButton
                            className="update-post-button"
                            buttonText="Update"
                            modalComponent={<UpdatePostModal post={post} />}
                        />
                        <OpenModalButton
                            className="delete-post-button"
                            buttonText="Delete"
                            modalComponent={<DeletePostModal post={post} />}
                        />
                    </div>
                    : <></>
                }
            </div>
            <div className="post-body">
                {post.body}
            </div>
            <div className="post-pics">
                <img width="500px" src={post.media} />
            </div>

            <div>
                <PostComments post={post} />
            </div>
            {currentUser ?
                <div className="post-comment-input">
                    <form>
                        <textarea
                            type="text"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Leave a comment!"
                        ></textarea>
                        <div className="post-comment-bottom">
                            <button type="submit" onClick={handleSubmit}>Send It</button>
                            {errors && submitted && <div className="bottom-error">Comment needs at least one character</div>}
                            <PostLikes post={post} />
                        </div>
                    </form>
                </div>
                :
                <button className="like-counter" onClick={logIn}>
                    {filterLikes.length}
                    <i class="fa-regular fa-thumbs-up like-thumb space"/>
                </button>
            }
        </div>
    )
}
