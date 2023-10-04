from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, SelectField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError

class PostForm(FlaskForm):
    media = URLField("Media")
    body = StringField("Post Body", validators=[DataRequired(), Length(min=1, message="Post must have at least 1 character!")])
    submit = SubmitField("Submit Post")
