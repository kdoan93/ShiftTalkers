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
        <div className="post-modal-form">
            <div className="deleteTitle">
                <h2 className="post-modal-title">Confirm Delete</h2>
                <p className="deleteParagraph">Are you sure you want to delete this post?</p>
            </div>
            <div className="deleteButtons">
                <button className="post-modal-button" onClick={handleClick}> Yes (Delete Post) </button>
                <button className="post-modal-button" onClick={closeModal}> No (Keep Post) </button>
            </div>
        </div>
    )
}
