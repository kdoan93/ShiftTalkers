import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetLikes, thunkGetPostLikes } from "../../store/like"
import "./like.css"


export const PostLikes = ({ post }) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.session.user)

    const postLikes = useSelector((state) => state.likes.allLikes)
    let likes = Object.values(postLikes)

    const filterLikes = likes.filter(like => like.post_id === post.id)
    // console.log("postLikes: ", likes)

    const userLiked = filterLikes.filter(like => like.user_id === currentUser.id)
    console.log("userLiked: ", userLiked)

    useEffect(() => {
        dispatch(thunkGetLikes())
    }, [dispatch, likes.length])

    if (!postLikes) return null

    return (
        <div className="likes-container">
            {filterLikes.length && filterLikes.length > 1 ? filterLikes.length : filterLikes.length} {filterLikes.length !== 1 ? "Likes" : "Like"}
            {userLiked.length ? <i class="fa-solid fa-thumbs-up"/> : <i class="fa-regular fa-thumbs-up"/>}
            {/* {likes.forEach(like => (
                <div>{like.length}</div>
            ))} */}
        </div>
    )
}
