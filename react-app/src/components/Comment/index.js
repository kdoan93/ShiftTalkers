import { useEffect } from "react"
import "./comment.css"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetComments, thunkGetPostComments } from "../../store/comment"

export const PostComments = ({ post }) => {
    const dispatch = useDispatch()
    const allComments = useSelector((state) => state.comments.allComments)
    const comments = Object.values(allComments)
    // console.log("PostComments comments: ", comments)
    // console.log("PostComments post: ", post)

    useEffect(() => {
        // dispatch(thunkGetComments())
        dispatch(thunkGetPostComments(post.id))
    }, [dispatch, post.id])
    return (
        <div>
            <h2>Post comment component</h2>
            <div>
                {comments.map((comment) => (
                    <div>{comment.comment}</div>
                ))}
            </div>
        </div>
    )
}
