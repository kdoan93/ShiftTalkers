from flask import Blueprint, jsonify, request, redirect
from app.models import Post, User, Comment, Like
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from ..forms.post_form import PostForm
from datetime import date
from ..models.db import db
from flask_login import current_user, login_required


post_routes = Blueprint('post', __name__)


@post_routes.route('/current')
@login_required
def get_all_reviews():
    """
    GET all current user's reviews
    """

    all_reviews = Post.query.all()
    all_review_list = [review.to_dict() for review in all_reviews if review.user_id == current_user.id]

    return all_review_list
