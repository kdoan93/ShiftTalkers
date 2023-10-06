// Index.js for post detail
import { useHistory, useParams } from "react-router-dom/";
import "./Post.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export const PostDetail = ({ post }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { userId } = useParams()

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

    }, [dispatch, userId])

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
        </div>
    )
}
