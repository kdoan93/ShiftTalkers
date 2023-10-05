from flask import Blueprint, jsonify, request, redirect
from app.models import Post, User, Comment, Like
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from datetime import date
from ..models.db import db
from flask_login import current_user, login_required


like_routes = Blueprint('like', __name__)


@like_routes.route('/')
def get_all_likes():
    """
    Query for all likes and returns them in a list of dictionaries
    """

    likes = Like.query.all()

    all_like_list = [like.to_dict() for like in likes]

    # return "POST ROUTE"
    return { "likes": all_like_list }