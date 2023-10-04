from flask import Blueprint, jsonify, request, redirect
from app.models import Post, User, Comment, Like
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from ..forms.post_form import PostForm
from datetime import date
from ..models.db import db
from flask_login import current_user, login_required


comment_routes = Blueprint('comment', __name__)
