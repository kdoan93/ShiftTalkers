import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAddLike, thunkGetLikes, thunkGetPostLikes, thunkRemoveLike } from "../../store/like"
import "./like.css"


export const PostLikes = ({ post }) => {
    const dispatch = useDispatch()

    const postId = post.id

    const currentUser = useSelector((state) => state.session.user)

    const currentUserId = currentUser.id

    const postLikes = useSelector((state) => state.likes.allLikes)
    let likes = Object.values(postLikes)

    const filterLikes = likes.filter(like => like.post_id === post.id)
    // console.log("postLikes: ", likes)

    const userLiked = filterLikes.filter(like => like.user_id === currentUser.id)
    // console.log("userLiked: ", userLiked)

    useEffect(() => {
        dispatch(thunkGetLikes())
    }, [dispatch, likes.length])

    const like = async (e) => {
        e.preventDefault()
        await dispatch(thunkAddLike({postId, currentUserId}, postId))
    }

    const unlike = async (e) => {
        e.preventDefault()
        await dispatch(thunkRemoveLike(postId))
    }

    if (!postLikes) return null

    return (
        <div className="likes-container">
            {userLiked.length ?
                <button onClick={unlike}>
                    <i class="fa-solid fa-thumbs-up"/>
                </button>
                :
                <button onClick={like}>
                    <i class="fa-regular fa-thumbs-up"/>
                </button>
            }

            {filterLikes.length && filterLikes.length > 1 ? filterLikes.length : filterLikes.length} {filterLikes.length !== 1 ? "Likes" : "Like"}
        </div>
    )
}
