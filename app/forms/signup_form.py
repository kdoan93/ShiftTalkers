from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def url_validator(form, field):
    if ".jpeg" not in field.data and ".jpg" not in field.data and ".png" not in field.data:
        raise ValidationError("URL must contain .jpeg, .jpg, or .png")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=1, message="First name must have at least 1 character")])
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=1, message="Last name must have at least 1 character")])
    profile_pic = URLField('profile_pic', validators=[DataRequired(), url_validator])
    password = StringField('password', validators=[DataRequired()])
