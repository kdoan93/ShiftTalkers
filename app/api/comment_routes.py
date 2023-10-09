from flask import Blueprint, jsonify, request, redirect
from app.models import Post, User, Comment, Like
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from ..forms.post_form import PostForm
from datetime import date
from ..models.db import db
from flask_login import current_user, login_required


comment_routes = Blueprint('comment', __name__)


@comment_routes.route('/')
def get_all_comments():
    """
    Query for all comment and returns them in a list of dictionaries
    """

    comments = Comment.query.all()

    all_comment_list = [comment.to_dict() for comment in comments]

    return all_comment_list

@comment_routes.route('/<int:id>')
def get_comment_by_id(id):
    """
    Query for comment by comment.id
    """
    one_comment = Comment.query.get(id)

    if not one_comment:
        return { "message": "Comment not found!" }, 404

    return one_comment.to_dict()

@comment_routes.route('/<int:id>')
def get_comment_by_id(id):
    """
    Query for comment by comment.id
    """
    one_comment = Comment.query.get(id)

    if not one_comment:
        return { "message": "Comment not found!" }, 404

    return one_comment.to_dict()


@comment_routes.route("/all")
@login_required
def get_user_comments():
    """
    Query to get all comments created by current user
    """

    comments = Comment.query.all()

    if not comments:
        return { "message": "User has not left any comments yet!" }

    posted_comments = [ comment.to_dict() for comment in comments if comment.user_id == current_user.id ]

    return { "comments": posted_comments }


@comment_routes.route('/current')
def user_posts():
    """
    Query to get all current user's comments
    """

    all_comments = Comment.query.all()

    user_comments = [ post.to_dict() for post in all_comments if post.user_id == current_user.id ]

    if not user_comments:
        return { "message": "User has no comment yet!" }, 404

    return user_comments


@comment_routes.route('<int:commentId>', methods=["PUT"])
@login_required
def update_comment(commentId):
    """
    Update the current user's comment by id
    """

    form = CommentForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    comment_to_update = Comment.query.get(commentId)

    if not comment_to_update:
        return { "message": "Comment not found!" }, 404

    if comment_to_update.user_id == current_user.id:
        if form.validate_on_submit():
            comment_to_update.comment = form.data["comment"]
            db.session.commit()
            return comment_to_update.to_dict()

        else:
            return { "errors": form.errors }, 400

    else:
        return { "message": "FORBIDDEN" }, 403


@comment_routes.route('/<int:commentId>', methods=["DELETE"])
@login_required
def delete_comment(commentId):
    """
    Delete a current user's comment
    """

    comment_to_delete = Comment.query.get(commentId)

    if comment_to_delete:
        if comment_to_delete.user_id == current_user.id:
            db.session.delete(comment_to_delete)
            db.session.commit()
            return { "message": "Delete successful!" }
        else:
            return { "message": "FORBIDDEN" }, 403

    else:
        return { "message": "Comment not found" }, 404
