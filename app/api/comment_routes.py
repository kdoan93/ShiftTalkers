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
    # all_comments_list = [comment.to_dict() for comment in comments]

    return { "comments": all_comment_list }
