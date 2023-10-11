import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import { UpdateCommentModal } from "./UpdateCommentModal"
import * as commentActions from "../../store/comment"
import "./comment.css"
import { DeleteCommentModal } from "./DeleteCommentModal"

export const PostComments = ({ post }) => {
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch()

    const { closeModal } = useModal()

    const currentUser = useSelector((state) => state.session.user)
    // console.log("PostComments currentUser: ", currentUser)

    const allComments = useSelector((state) => state.comments.allComments)
    const comments = Object.values(allComments).reverse()
    // console.log("PostComments comments: ", comments)

    const filterComments = comments.filter(comment => comment.post_id === post.id)

    useEffect(() => {
        // dispatch(thunkGetPostComments(post.id))
        setSubmitted(false)
        dispatch(commentActions.thunkGetComments())
    }, [dispatch, comments.length])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        try {
            await dispatch(commentActions.thunkCreateComment({ comment }, post.id)
            )
            setSubmitted(true)
            // closeModal()
        } catch (errors) {
            if (errors) {
                setErrors(errors)
                setSubmitted(true)
                // console.log("PostComments errors: ", errors.ok)
            }
        }
        // setSubmitted(false)
    }

    if (!comments) return null

    return (
        <div className="post-comment-container">
            {/* <h2>Post comment modal</h2> */}
            {currentUser &&
                <div>
                    <h3>Leave a comment!</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            type="text"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Leave a comment"
                            ></textarea>
                        <button type="submit">Submit comment</button>
                        {errors && submitted && <div className="bottom-error">Comment needs at least one character</div>}
                    </form>
                </div>
            }

            {filterComments && filterComments.map((comment) => (
                <div>
                    <div className="post-comment-single" key={comment.id}>
                        <NavLink className="comment-user-pic" exact to={`/users/${comment.user_id}`} >
                            <img className="post-comment-profile-pic" style={{ width: '50px', height: '50px', borderRadius: "50%" }} src={comment.profile_pic} />
                        </NavLink>
                        <div className="post-comment-comment-container">
                            <NavLink className="comment-user" exact to={`/users/${comment.user_id}`} >
                                {comment.username}
                            </NavLink>
                            {comment.comment}
                        </div>
                    </div>
                    {currentUser && comment.user_id === currentUser.id ?
                            <div>
                                <OpenModalButton
                                    className="update-comment-button"
                                    buttonText="Update"
                                    modalComponent={<UpdateCommentModal comment={comment} />}
                                />
                                <OpenModalButton
                                    className="delete-comment-button"
                                    buttonText="Delete"
                                    modalComponent={<DeleteCommentModal comment={comment} postId={post.id} />}
                                />

                            </div>
                            :
                            <></>
                        }
                </div>
            ))}

            {/* {currentUser &&
                <div>
                    <h3>Leave a comment!</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            type="text"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Leave a comment!"
                            ></textarea>
                        <button type="submit">Submit Comment</button>
                        {errors && submitted && <div className="bottom-error">Comment needs at least one character</div>}
                    </form>
                </div>
            } */}

            {/* <div>
                {comments.map((comment) => (
                    <div className="post-single-comment">
                        <div className="post-comment-profile-pic">
                            <NavLink exact to={`/users/${comment.user_id}`} >
                                <img className="post-comment-profile-pic" style={{ width: '300px'}} src={comment.profile_pic} />
                            </NavLink>
                        </div>

                        <div className="post-comment-comment">{comment.comment}</div>
                        {currentUser && comment.user_id === currentUser.id ?
                            <div>
                                <OpenModalButton
                                    className="update-comment-button"
                                    buttonText="Update"
                                    modalComponent={<UpdateCommentModal comment={comment} />}
                                />
                                <OpenModalButton
                                    className="delete-comment-button"
                                    buttonText="Delete"
                                    modalComponent={<DeleteCommentModal comment={comment} postId={post.id} />}
                                />

                            </div>
                            :
                            <></>
                        }
                    </div>
                ))}
            </div> */}
        </div>
    )
}
