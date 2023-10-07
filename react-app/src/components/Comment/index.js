import { useEffect } from "react"
import "./comment.css"
import { useDispatch } from "react-redux"

export const PostComments = ({ post }) => {
    const dispatch = useDispatch()
    useEffect(() => {

    }, [dispatch])
    return (
        <div>
            <h2>Post comment component</h2>
        </div>
    )
}