import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import "./User.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  thunkGetUserPosts } from "../../store/post"
import { PostDetail } from "../Post"


export const ProfilePage = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    let userPosts = useSelector((state) => state.posts.allPosts)
    userPosts = Object.values(userPosts).reverse()
    // console.log("UserDetails userPosts: ", userPosts)

    const user = useSelector((state) => state.session.user)
    // console.log("UserDetail user: ", user)

    // const filterPosts = userPosts.map(post => post.user_id === user.id)
    // console.log("ProfilePage filterPosts: ", filterPosts)

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
    // }, [dispatch, filterPosts.length])

    if (!userPosts) return null
    if (!user) return null
    // if (!filterPosts) return null

    return (
        <div className="user-detail-container">
            <div className="user-detail-upper">
                {/* <img className="user-detail-profile-pic" src={userPosts[0].profile_pic} /> */}
                <img className="user-detail-profile-pic" src={user.profile_pic} />
                <div className="user-detail-user-info">
                    <p className="user-detail-name">
                        {/* {userPosts[0].first_name} {userPosts[0].last_name} */}
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
            {userPosts.length ? userPosts.map((post) => (
                <PostDetail post={post} />
            )) : <h2>User has no post yet!</h2>}
        </div>
    )
}
