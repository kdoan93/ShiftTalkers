import { useEffect } from "react"
import "./comment.css"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetComments, thunkGetPostComments } from "../../store/comment"

export const PostComments = ({ post }) => {
    const dispatch = useDispatch()
    // let comments = useSelector((state) => state.comments.allComments)
    // comments = Object.values(comments)
    // console.log("PostComments comments: ", comments)
    // console.log("PostComments post: ", post)

    useEffect(() => {
        // dispatch(thunkGetComments())
    }, [dispatch])
    return (
        <div>
            <h2>Post comment component</h2>
            {/* {comments.forEach((comment) => comment.user_id === post.user_id ? <div>user_id matches!</div> : <></> )} */}
        </div>
    )
}
