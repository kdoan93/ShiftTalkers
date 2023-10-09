import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetPostComments } from "../../store/comment"
import "./comment.css"

export const PostComments = ({ postId }) => {
    const dispatch = useDispatch()
    let comments = useSelector((state) => state.comments.allComments)
    comments = Object.values(comments)
    console.log("PostComments comments: ", comments)

    useEffect(() => {
        dispatch(thunkGetPostComments(postId))
    }, [dispatch, comments.length])

    // if (!comments.length) return null;

    return (
        <div>
            <h2>Post comment component</h2>
            {comments ? comments.map((comment) => (
                <div key={comment.id}>{comment.comment}</div>

            )) : "Post has no comments!" }
        </div>
    )
}
