import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import "./User.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetUserPosts } from "../../store/post"
import { PostDetail } from "../Post"
import { thunkGetUser } from "../../store/session"


export const UserDetail = () => {
    const history = useHistory()
    const { userId } = useParams()
    const dispatch = useDispatch()

    let userPosts = useSelector((state) => state.posts.allPosts)
    userPosts = Object.values(userPosts).reverse()
    // console.log("UserDetails userPosts: ", userPosts)

    // const user = useSelector((state) => state.session.user)
    // console.log("UserDetail user: ", user)

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let day = newDate.substring(7,10)
        let year = newDate.substring(10, 16)
        return month.concat(day, ",", year)
    }

    useEffect(() => {
        dispatch(thunkGetUserPosts(userId))
        dispatch(thunkGetUser(userId))
    }, [dispatch, userPosts.length])

    if (!userPosts) return null
    
    return (
        <div className="user-detail-container">
            <p className="user-detail-name">
                {post.first_name} {post.last_name}
            </p>
            {userPosts.map((post) => (
            <div className="user-detail-upper">
                <img className="user-detail-profile-pic" src={post.profile_pic} />
                <div className="user-detail-user-info">
                    <p className="user-detail-bottom">
                        {post.username}
                    </p>
                    <p className="user-detail-bottom">
                        Joined: {lowBudgetDateConverter(post.created_at)}
                    </p>
                </div>
                <PostDetail post={post} />
            </div>
            ))}
        </div>
    )
}
