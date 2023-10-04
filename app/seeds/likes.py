from app.models import db, environment, SCHEMA, Like
from sqlalchemy.sql import text


def seed_likes():
    like1 = Like(
        post_id = 1,
        user_id = 2,
    )
    like2 = Like(
        post_id = 2,
        user_id = 2,
    )
    like3 = Like(
        post_id = 3,
        user_id = 2,
    )
    like4 = Like(
        post_id = 4,
        user_id = 2,
    )
    like5 = Like(
        post_id = 1,
        user_id = 3,
    )
    like6 = Like(
        post_id = 2,
        user_id = 3,
    )
    like7 = Like(
        post_id = 3,
        user_id = 3,
    )
    like8 = Like(
        post_id = 4,
        user_id = 3,
    )
    like9 = Like(
        post_id = 6,
        user_id = 1,
    )
    like10 = Like(
        post_id = 7,
        user_id = 1,
    )
    like11 = Like(
        post_id = 8,
        user_id = 1,
    )
    like12 = Like(
        post_id = 9,
        user_id = 1,
    )
    like13 = Like(
        post_id = 6,
        user_id = 3,
    )
    like14 = Like(
        post_id = 7,
        user_id = 3,
    )
    like15 = Like(
        post_id = 8,
        user_id = 3,
    )
    like16 = Like(
        post_id = 9,
        user_id = 3,
    )
    like17 = Like(
        post_id = 11,
        user_id = 2,
    )
    like18 = Like(
        post_id = 12,
        user_id = 2,
    )
    like19 = Like(
        post_id = 13,
        user_id = 2,
    )
    like20 = Like(
        post_id = 14,
        user_id = 2,
    )
    like21 = Like(
        post_id = 11,
        user_id = 1,
    )
    like22 = Like(
        post_id = 12,
        user_id = 1,
    )
    like23 = Like(
        post_id = 13,
        user_id = 1,
    )
    like24 = Like(
        post_id = 14,
        user_id = 1,
    )


    likes = [
        like1,
        like2,
        like3,
        like4,
        like5,
        like6,
        like7,
        like8,
        like9,
        like10,
        like11,
        like12,
        like13,
        like14,
        like15,
        like16,
        like17,
        like18,
        like19,
        like20,
        like21,
        like22,
        like23,
        like24,
    ]
    add_like = [ db.session.add(like) for like in likes ]
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
