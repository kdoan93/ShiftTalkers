from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        post_id = 1,
        user_id = 2,
        comment = "Drag racing in a Prius?? 😂 RIP Bud"
    )
    comment2 = Comment(
        post_id = 2,
        user_id = 2,
        comment = "Didn't see that coming! 🤣😂"
    )
    comment3 = Comment(
        post_id = 3,
        user_id = 2,
        comment = "🤯"
    )
    comment4 = Comment(
        post_id = 4,
        user_id = 2,
        comment = "F"
    )
    comment5 = Comment(
        post_id = 1,
        user_id = 3,
        comment = "You must be lost 😂"
    )
    comment6 = Comment(
        post_id = 2,
        user_id = 3,
        comment = "OOF"
    )
    comment7 = Comment(
        post_id = 3,
        user_id = 3,
        comment = "💯 Sleeper status!"
    )
    comment8 = Comment(
        post_id = 4,
        user_id = 3,
        comment = "Gapped him by slinky buses!!"
    )
    comment9 = Comment(
        post_id = 6,
        user_id = 1,
        comment = "That was me in the Prius! 😤"
    )
    comment10 = Comment(
        post_id = 7,
        user_id = 1,
        comment = "Toyota gang!"
    )
    comment11 = Comment(
        post_id = 8,
        user_id = 1,
        comment = "Those Regamasters 😍"
    )
    comment12 = Comment(
        post_id = 9,
        user_id = 1,
        comment = "Fine like a ticket on the dash!"
    )
    comment13 = Comment(
        post_id = 6,
        user_id = 3,
        comment = "Chopped! ✌"
    )
    comment14 = Comment(
        post_id = 7,
        user_id = 3,
        comment = "Agreed! FL5s are 👌"
    )
    comment15 = Comment(
        post_id = 8,
        user_id = 3,
        comment = "😍😍😍"
    )
    comment16 = Comment(
        post_id = 9,
        user_id = 3,
        comment = "Aged like fine wine 🤍"
    )
    comment17 = Comment(
        post_id = 11,
        user_id = 2,
        comment = "Took you to Gapplebee's!"
    )
    comment18 = Comment(
        post_id = 12,
        user_id = 2,
        comment = "With a car like that, I'd let it slide!"
    )
    comment19 = Comment(
        post_id = 13,
        user_id = 2,
        comment = "Regamasters > TE37!"
    )
    comment20 = Comment(
        post_id = 14,
        user_id = 2,
        comment = "Ford beat Ferrari at Le Mans 4 consecutive times! ❤🤍💙"
    )
    comment21 = Comment(
        post_id = 11,
        user_id = 1,
        comment = "TAKE MY MONEY!"
    )
    comment22 = Comment(
        post_id = 12,
        user_id = 1,
        comment = "Their driving is proabably as bad as their parking"
    )
    comment23 = Comment(
        post_id = 13,
        user_id = 1,
        comment = "TE37 look great on everything!"
    )
    comment24 = Comment(
        post_id = 14,
        user_id = 1,
        comment = "4 time consecutive Le Mans Champion!"
    )


    comments = [
        comment1,
        comment2,
        comment3,
        comment4,
        comment5,
        comment6,
        comment7,
        comment8,
        comment9,
        comment10,
        comment11,
        comment12,
        comment13,
        comment14,
        comment15,
        comment16,
        comment17,
        comment18,
        comment19,
        comment20,
        comment21,
        comment22,
        comment23,
        comment24,
    ]
    add_comment = [ db.session.add(comment) for comment in comments ]
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
