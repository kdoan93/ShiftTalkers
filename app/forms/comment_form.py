from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, SelectField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError

class CommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired(), Length(min=1, message="Comment must have at least 1 character!")])
    submit = SubmitField("Submit Comment")
