import { useEffect } from "react"
import "./comment.css"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetPostComments } from "../../store/comment"
import { thunkGetUser } from "../../store/session"
import { NavLink } from "react-router-dom"
import { useModal } from "../../context/Modal"

export const PostComments = ({ post }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const currentUser = useSelector((state) => state.session.user)
    console.log("PostComments currentUser: ", currentUser)

    const allComments = useSelector((state) => state.comments.allComments)
    const comments = Object.values(allComments)
    console.log("PostComments comments: ", comments)

    useEffect(() => {
        dispatch(thunkGetPostComments(post.id))
        // dispatch(thunkGetUser(post.user_id))
    }, [dispatch, post.id, comments.length])

    if (!comments) return null

    return (
        <div>
            <h2>Post comment modal</h2>
            <div>
                {comments.map((comment) => (
                    <div className="post-comment-container">
                        <div className="post-comment-profile-pic">
                            <NavLink exact to={`/users/${comment.user_id}`} >
                                <img style={{ width: '300px'}} src={comment.profile_pic} />
                            </NavLink>
                        </div>

                        <div className="post-comment-comment">{comment.comment}</div>

                    </div>
                ))}
            </div>
            {/* {comments ? <p>has comments</p> : <p>leave a comment!</p>} */}
        </div>
    )
}
