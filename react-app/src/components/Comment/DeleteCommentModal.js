import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentActions from '../../store/comment'


export const DeleteCommentModal = ({ comment, postId }) => {

    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();
        return dispatch(commentActions.thunkDeleteComment(comment.id)).then(closeModal)
    }

    useEffect(() => {
        dispatch(commentActions.thunkGetPostComments(postId))
    }, [dispatch, postId])

    return (
        <div className="deleteModal">
            <div className="deleteTitle">
                <h2 className="confirmDeleteTitle">Confirm Delete</h2>
                <p className="deleteParagraph">Are you sure you want to delete this comment?</p>
            </div>
            <div className="deleteButtons">
                <button className="b yesButton" onClick={handleClick}> Yes (Delete Comment) </button>
                <button className="b noButton" onClick={closeModal}> No (Keep Comment) </button>
            </div>
        </div>
    )
}
