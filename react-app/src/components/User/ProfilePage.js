import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetUserPosts } from "../../store/post"
import { PostDetail } from "../Post"
import "./User.css"


export const ProfilePage = () => {
    const dispatch = useDispatch()

    let userPosts = useSelector((state) => state.posts.allPosts)
    userPosts = Object.values(userPosts).reverse()

    const user = useSelector((state) => state.session.user)

    const filterPosts = userPosts.map(post => post.user_id === user.id)

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let day = newDate.substring(7,10)
        let year = newDate.substring(10, 16)
        return month.concat(day, ",", year)
    }

    useEffect(() => {
        dispatch(thunkGetUserPosts(user.id))
    }, [dispatch, userPosts.length])

    if (!userPosts) return null
    if (!user) return null

    return (
        <div className="user-detail-container">
            <div className="user-detail-upper">
                <img className="user-detail-profile-pic" src={user.profile_pic} />
                <div className="user-detail-user-info">
                    <p className="user-detail-name">
                        {user.first_name} {user.last_name}
                    </p>
                    <p className="user-detail-bottom">
                        {user.username}
                    </p>
                    <p className="user-detail-bottom">
                        Joined: {lowBudgetDateConverter(user.created_at)}
                    </p>
                </div>
            </div>
            {filterPosts[0] ? userPosts.map((post) => (
                <PostDetail post={post} />
            )) : <h2>{user.username} has no post yet, make a post ShiftTalker!</h2>}
        </div>
    )
}
