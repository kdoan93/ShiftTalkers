from flask_wtf import FlaskForm
from wtforms import SubmitField

class LikeForm(FlaskForm):
    submit = SubmitField("Submit Like")
