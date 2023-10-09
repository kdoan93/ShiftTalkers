import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css"
import { thunkGetPosts } from "../../store/post";
import { PostDetail } from "../Post";
import { thunkGetComments, thunkGetPostComments } from "../../store/comment";

export const LandingPage = () => {
  const dispatch = useDispatch();

const getPosts = useSelector((state) => state.posts.allPosts)
const posts = Object.values(getPosts).reverse()

// const allComments = useSelector((state) => state.comments.allComments)
// const commentsArray = Object.values(allComments)
// console.log("LandingPage commentsArray: ", commentsArray)

  useEffect(() => {
    dispatch(thunkGetPosts())
    // dispatch(thunkGetComments())
    // dispatch(thunkGetPostComments(post.id))
  }, [dispatch, posts.length]);

  if (!posts) return null

  return (
    <div className="landing-page-container">
        {posts.map((post) => (
          <div key={post.id} className="post-landing-page-container">
            <PostDetail post={post} />
          </div>
        ))}
    </div>
  );
};
