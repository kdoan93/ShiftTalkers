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
    // console.log("filterLikes: ", filterLikes)

    const userLiked = filterLikes.filter(like => like.user_id === currentUser.id)
    // console.log("userLiked: ", userLiked)

    useEffect(() => {
        dispatch(thunkGetLikes())
    }, [dispatch, likes.length, userLiked.length, filterLikes.length, postLikes.length])

    const like = async (e) => {
        e.preventDefault()
        await dispatch(thunkAddLike({postId, currentUserId}, postId))
    }

    const unlike = async (e) => {
        e.preventDefault()
        await dispatch(thunkRemoveLike(userLiked[0].id))
    }

    if (!postLikes) return null

    return (
        <div className="likes-container">
            {userLiked.length ?
                <button onClick={unlike}>
                    {filterLikes.length}
                    <i class="fa-solid fa-thumbs-up like-thumb"/>
                </button>
                :
                <button onClick={like}>
                    {filterLikes.length}
                    <i class="fa-regular fa-thumbs-up like-thumb"/>
                </button>
            }
            {/* <div className="likes-counter">
                {filterLikes.length && filterLikes.length > 1 ? filterLikes.length : filterLikes.length} {filterLikes.length !== 1 ? "Likes" : "Like"}
            </div> */}
        </div>
    )
}
