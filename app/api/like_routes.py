from flask import Blueprint, jsonify, request, redirect
from app.models import Post, User, Comment, Like
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from datetime import date
from ..models.db import db
from flask_login import current_user, login_required


like_routes = Blueprint('like', __name__)


@like_routes.route('')
def get_all_likes():
    """
    Query for all likes and returns them in a list of dictionaries
    """

    likes = Like.query.all()

    all_like_list = [like.to_dict() for like in likes]

    return all_like_list


@like_routes.route('/<int:likeId>', methods=["DELETE"])
@login_required
def remove_like(likeId):
    """
    Delete a current user's like
    """

    like_to_delete = Like.query.get(likeId)

    if like_to_delete:
        if like_to_delete.user_id == current_user.id:
            db.session.delete(like_to_delete)
            db.session.commit()
            return { "message": "Delete successful!" }
        else:
            return { "message": "FORBIDDEN" }, 403

    else:
        return { "message": "Like not found" }, 404
