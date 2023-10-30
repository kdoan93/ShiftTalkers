from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text


def seed_posts():
    post1 = Post(
        user_id= 1,
        media="https://cdn.motor1.com/images/mgl/Ooe1QB/s1/toyota-prius-subaru-wrx-mazda-3-drag-race.jpg",
        body="Just went drag racing in a Prius!",
    )
    post2 = Post(
        user_id= 1,
        media="https://s1.cdn.autoevolution.com/images/news/gallery/2023-toyota-prius-prime-drag-races-manual-subaru-wrx-and-mazda3-turbo-loses-every-time_9.jpg",
        body="...I don't win much 😢",
    )
    post3 = Post(
        user_id= 1,
        media="https://i0.wp.com/engineswapdepot.com/wp-content/uploads/2017/11/custom-Toyota-Prius-with-a-Hellcat-V8-06.jpg?ssl\u003d1",
        body="Just built a Prius with a Hellcat motor swap 😈",
    )
    post4 = Post(
        user_id= 1,
        media="https://hips.hearstapps.com/hmg-prod/images/screen-shot-2018-08-15-at-3-28-49-pm-1534361354.png",
        body="First Prius Hellcat victim!!!",
    )
    post5 = Post(
        user_id= 1,
        media="https://www.autozeitung.de/assets/styles/article_image/public/field/images/toyota-gr-prius.jpg?itok=idKwvQJu",
        body="Toyota please make the GR Prius! 🙏",
    )
    post6 = Post(
        user_id= 2,
        media="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1682094418/evo/2023/04/Honda%20Civic%20Type%20R%20FL5%20Nurburgring%20record.jpg",
        body="Just lapped a Prius at the Nürburgring 🤣",
    )
    post7 = Post(
        user_id= 2,
        media="https://www.civic11forum.com/cdn-cgi/image/format=auto,onerror=redirect,width=1920,height=1920,fit=scale-down/https://www.civic11forum.com/attachments/gr-corolla-type-r-png.13193/",
        body="FL5 Type R > GR Corolla",
    )
    post8 = Post(
        user_id= 2,
        media="https://www.civicx.com/forum/attachments/fl5-type-r-wheels-jpg.379311/",
        body="♥",
    )
    post9 = Post(
        user_id= 2,
        media="https://wallpapercave.com/wp/vq3qbvK.jpg",
        body="This is one fine Evo 9!",
    )
    post10 = Post(
        user_id= 2,
        media="https://blog.fcpeuro.com/hs-fs/hubfs/Images/Blog/active/20200415_FEATURE_POUYA-E46-M3/14-pouya-bmw-e46-m3-csl-front.jpg?width=960&name=14-pouya-bmw-e46-m3-csl-front.jpg",
        body="Taking the long way home",
    )
    post11 = Post(
        user_id= 3,
        media="https://media.ed.edmunds-media.com/toyota/gr-corolla/2023/hero/2023_toyota_gr-corolla_actburn_hero_330221_500.jpg",
        body="Anyone looking to buy a 'lightly' used GR Corolla 😅",
    )
    post12 = Post(
        user_id= 3,
        media="https://images.squarespace-cdn.com/content/v1/58916f89bebafb5d2bed8684/1562782375640-VXX0LOE3WFNZSP098XUI/2005+Ford+GT+Red-1.jpg?format=2500w",
        body="You can't park there!",
    )
    post13 = Post(
        user_id= 3,
        media="https://live.staticflickr.com/6100/6300611014_79e537365a_b.jpg",
        body="TE37s > everything",
    )
    post14 = Post(
        user_id= 3,
        media="https://hips.hearstapps.com/roa.h-cdn.co/assets/16/17/1600x800/landscape-1462001582-1205-ja-ferford-rivals-frd-frri-024.jpg?resize=640:*",
        body="Ferrari Killer",
    )
    post15 = Post(
        user_id= 3,
        media="https://images.saatchiart.com/saatchi/1711693/art/10100409/9163181-WWWVGOSA-7.jpg",
        body="KB43VER",
    )
    post16 = Post(
        user_id = 4,
        media = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Nissan_Skyline_GT-R_R34_V_Spec_II.jpg/1200px-Nissan_Skyline_GT-R_R34_V_Spec_II.jpg",
        body = "Spotted Godzilla in the wild!"
    )
    post17 = Post(
        user_id = 4,
        media = "https://cdn.recaro-automotive.com/fileadmin/00-corporate-website/07-Partners/wor-hero_1660x600-chelsea-denofa.png?v=1630101508",
        body = "Chelsea DeNofa is officially retiring Formula Drift! 😭"
    )
    post18 = Post(
        user_id = 4,
        media = "https://imgx.gridoto.com/crop/0x0:0x0/700x465/photo/2022/01/19/f-iec7kwsrusup_2jrektwjpg-20220119055755.jpg",
        body = "Keiichi Tsuchiya and his legendary AE86!"
    )
    post19 = Post(
        user_id = 4,
        media = "https://www.autozeitung.de/assets/field/image/bmw-m3-e30-mercedes-190-evo.jpg",
        body = "🖤🧡💛"
    )
    post20 = Post(
        user_id = 4,
        media = "https://fuelfed.files.wordpress.com/2012/09/reynolds_trans_am.jpg?w=584",
        body = "RIP Burt"
    )

    posts = [
        post1,
        post2,
        post3,
        post4,
        post5,
        post6,
        post7,
        post8,
        post9,
        post10,
        post11,
        post12,
        post13,
        post14,
        post15,
        post16,
        post17,
        post18,
        post19,
        post20
    ]
    add_post = [ db.session.add(post) for post in posts ]
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
