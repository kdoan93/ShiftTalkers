import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import { UpdateCommentModal } from "./UpdateCommentModal"
import * as commentActions from "../../store/comment"
import "./comment.css"
import { DeleteCommentModal } from "./DeleteCommentModal"

export const PostComments = ({ post }) => {

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.session.user)

    const allComments = useSelector((state) => state.comments.allComments)
    const comments = Object.values(allComments).reverse()

    const filterComments = comments.filter(comment => comment.post_id === post.id)

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let day = newDate.substring(7,10)
        // let year = newDate.substring(10, 16)
        return month.concat(day)
    }

    useEffect(() => {
        dispatch(commentActions.thunkGetComments())
    }, [dispatch, comments.length])

    if (!comments) return null

    return (
        <div className="post-comment-container">
            {filterComments && filterComments.map((comment) => (
                <div className="post-comment-single-container" key={comment.id}>
                    <NavLink className="post-comment-pic-container" exact to={`/users/${comment.user_id}`} >
                        <img style={{ width: '50px', height: '50px', borderRadius: "50%" }} src={comment.profile_pic} />
                    </NavLink>
                    <div className="post-comment-comment-container">
                        <div className="post-comment-user">
                            <NavLink className="post-comment-username" exact to={`/users/${comment.user_id}`} >
                                {comment.username}
                            </NavLink>
                            <i class="fa-solid fa-circle post-circle"></i>
                            <div className="post-comment-date">
                                {lowBudgetDateConverter(comment.created_at)}
                            </div>
                        </div>
                        {comment.comment}
                    </div>
                    {currentUser && comment.user_id === currentUser.id ?
                        <div className="post-comment-buttons">
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
        </div>
    )
}
