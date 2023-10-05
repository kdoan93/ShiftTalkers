// Index.js for post detail
import { useHistory } from "react-router-dom/";
import "./Post.css"

export const PostDetail = ({ post }) => {
    const { id, user_id, media, body, created_at, updated_at } = post

    const history = useHistory()

    const handleClick = () => {
        history.push(`/posts/${post.id}`)
    }

    return (
        <div className="post-details-container">
            <div className="post-upper-details">
                {post.username}
                {post.profile_pic}
                {post.created_at}
            </div>
            <div className="post-body">
                {post.body}
            </div>
            <div className="post-pics">
                {post.media}
            </div>
        </div>
    )
}
