import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetUserPosts } from "../../store/post"
import { PostDetail } from "../Post"
import "./User.css"


export const UserDetail = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()

    let userPosts = useSelector((state) => state.posts.allPosts)
    userPosts = Object.values(userPosts).reverse()

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let day = newDate.substring(7,10)
        let year = newDate.substring(10, 16)
        return month.concat(day, ",", year)
    }

    useEffect(() => {
        dispatch(thunkGetUserPosts(userId))
    }, [dispatch, userPosts.length, userId])

    if (!userPosts) return null

    return (
        <div className="user-detail-container">
            <div className="user-detail-upper">
                {userPosts.length && <img className="user-detail-profile-pic" src={userPosts[0].profile_pic} />}
                {userPosts.length && <div className="user-detail-user-info">
                    <p className="user-detail-name">
                        {userPosts[0].first_name} {userPosts[0].last_name}
                    </p>
                    <p className="user-detail-bottom">
                        {userPosts[0].username}
                    </p>
                    <p className="user-detail-bottom">
                        Joined: {lowBudgetDateConverter(userPosts[0].created_at)}
                    </p>
                </div>}
            </div>
            {userPosts.map((post) => (
                <PostDetail post={post} />
            ))}
        </div>
    )
}
