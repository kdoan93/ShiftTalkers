import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from '../../store/post'
import { useEffect } from "react";


export const DeletePostModal = ({ post }) => {

    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();
        return dispatch(postsActions.thunkDeletePost(post.id)).then(closeModal)
    }

    useEffect(() => {
        dispatch(postsActions.thunkGetPostInfo(post.id))
    }, [dispatch])

    return (
        <div className="deleteModal">
            <div className="deleteTitle">
                <h2 className="confirmDeleteTitle">Confirm Delete</h2>
                <p className="deleteParagraph">Are you sure you want to delete this post?</p>
            </div>
            <div className="deleteButtons">
                <button className="b yesButton" onClick={handleClick}> Yes (Delete Post) </button>
                <button className="b noButton" onClick={closeModal}> No (Keep Post) </button>
            </div>
        </div>
    )
}
