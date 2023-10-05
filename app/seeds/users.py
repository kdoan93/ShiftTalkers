from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        first_name='Demo',
        last_name='Lition',
        password='password',
        profile_pic='https://images.drive.com.au/driveau/image/private/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/ca-s3/2011/08/jeremy-clarkson-top-gear-e1313384063757-625x393.jpg'
    )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        first_name='Marnie',
        last_name='May',
        password='password',
        profile_pic='https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1988b0ce-567d-11eb-b0d0-071d11d2d557.jpg?crop=6036%2C4024%2C0%2C0'
    )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        first_name='Bobbie',
        last_name='Wobbie',
        password='password',
        profile_pic='https://media.speedcafe.com/wp-content/uploads/2020/09/MCMxMichelin.jpg'
    )
    kenny = User(
        username='kdoan93',
        email='kdoan93@gmail.com',
        first_name='Kenny',
        last_name='Doan',
        password='password',
        profile_pic='https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/Elmo-Flames-Meme.jpg'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kenny)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
