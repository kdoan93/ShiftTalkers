// Index.js for post detail
import { useHistory } from "react-router-dom/";
import "./Post.css"

export const PostDetail = ({ post }) => {

    const history = useHistory()

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

    return (
        <div className="post-details-container">
            <div className="post-upper-details">
                <img className="post-profile-pic" width="100px" src={post.profile_pic} />
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
        </div>
    )
}
