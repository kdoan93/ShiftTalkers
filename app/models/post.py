from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    media = db.Column(db.String)
    body = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship("User", back_populates = "posts")
    likes = db.relationship("Like", back_populates= "post", cascade="all, delete-orphan")
    comment = db.relationship("Comment", back_populates = "post", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'media': self.media,
            'body': self.body,
            'user': self.user,
            'comment': self.comment,
            'like': self.likes,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
