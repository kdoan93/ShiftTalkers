// Index.js for post detail
import { useHistory, useParams } from "react-router-dom/";
import "./Post.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { thunkGetPostComments } from "../../store/comment";
import { UpdatePostModal } from "./UpdatePostModal";
import { DeletePostModal } from "./DeletePostModal";
import { PostComments } from "../Comment";

export const PostDetail = ({ post }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    // const { userId } = useParams()

    const user = useSelector((state) => state.session.user)

    // let comments = useSelector((state) => state.comments.allComments)
    // comments = Object.values(comments)
    // console.log("PostDetail comments: ", comments)
    console.log("PostDetail post: ", post)

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let day = newDate.substring(7,10)
        let year = newDate.substring(10, 16)
        return month.concat(day)
    }

    const handleClick = () => {
        history.push(`/posts/${post.id}`)
    }

    useEffect(() => {
        // dispatch(thunkGetPostComments(post.id))
    }, [dispatch, post.body])

    // if (!comments) return null
    if (!user) return null

    return (
        <div className="post-details-container">
            <div className="post-upper-details">
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
            <div className="post-body">
                {post.body}
            </div>
            <div className="post-pics">
                <img width="500px" src={post.media} />
            </div>
            <div>
                <PostComments postId={post.id} />
                {/* Comment: {comments.map((comment) => (
                    <div>{comment.comment}</div>
                ))} */}
            </div>

            {user && user.id === post.user_id ?
            <div>
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
            :
            <div>DEBUG: Not your post!</div>
            // Dirty delete ^^^ when done
            }





            {/* <div>
                Post comments:
                {comments.map(comment => (
                    <div>{comment.comment}</div>
                ))}
            </div> */}
            {/*******Prop thread post.id and throw in comment component******/}
        </div>
    )
}
