from flask import Blueprint, jsonify, request, redirect
from app.models import Post, User, Comment, Like
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from datetime import date
from ..models.db import db
from flask_login import current_user, login_required


post_routes = Blueprint('post', __name__)


@post_routes.route('/')
def get_all_posts():
    """
    Query for all posts and returns them in a list of dictionaries
    """

    posts = Post.query.all()

    all_post_list = [post.to_dict() for post in posts]

    return { "posts": all_post_list }


@post_routes.route('/<int:id>')
def get_post_by_id(id):
    """
    Query for post by post.id
    """

    one_post = Post.query.get(id)

    if not one_post:
        return { "message": "Post not found!" }, 404

    return one_post.to_dict()


@post_routes.route('/current')
@login_required
def get_owned_posts():
    """
    GET all owned post route
    """

    all_posts = Post.query.all()
    owned_posts = [ post.to_dict() for post in all_posts if post.user_id == current_user.id ]

    return { "posts": owned_posts }


@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    """
    Route to create a post
    """

    form = PostForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_post = Post(
            user_id = current_user.id,
            media = form.data["media"],
            body = form.data["body"],
            created_at = date.today(),
            updated_at = date.today()
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201

    else:
        print(form.errors)
        return { "errors": form.errors }, 400


@post_routes.route("/<int:postId>", methods=["PUT"])
@login_required
def update_post(postId):
    """
    Update the current user's post
    """

    form = PostForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    post_to_update = Post.query.get(postId)

    if not post_to_update:
        return { "message": "Post not found!" }, 404

    if post_to_update.user_id == current_user.id:
        if form.validate_on_submit():
            post_to_update.media = form.data["media"]
            post_to_update.body = form.data["body"]
            db.session.commit()
            return post_to_update.to_dict()

        else:
            return { "errors": form.errors }, 400

    else:
        return { "message": "FORBIDDEN" }, 403


@post_routes.route("/<int:postId>", methods=["DELETE"])
@login_required
def delete_post(postId):
    """
    Delete a current user's post
    """

    post_to_delete = Post.query.get(postId)

    # if not post_to_delete:
    #     return { "message": "Post not found!" }, 404

    if post_to_delete:
        if post_to_delete.user_id == current_user.id:
            db.session.delete(post_to_delete)
            db.session.commit()
            return { "message": "Delete successful!" }
        else:
            return { "message": "FORBIDDEN" }, 403

    else:
        return { "message": "Post not found" }, 404
