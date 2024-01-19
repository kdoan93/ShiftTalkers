from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField, IntegerField, SelectField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.api.aws_helper_routes import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    # media = URLField("Media")
    media = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    body = StringField("Post Body", validators=[DataRequired(), Length(min=1, message="Post must have at least 1 character!")])
    submit = SubmitField("Submit Post")
