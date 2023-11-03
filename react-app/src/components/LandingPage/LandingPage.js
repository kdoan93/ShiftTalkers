import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPosts } from "../../store/post";
import { PostDetail } from "../Post";
import "./LandingPage.css"

export const LandingPage = () => {
  const dispatch = useDispatch();

const getPosts = useSelector((state) => state.posts.allPosts)
const posts = Object.values(getPosts).reverse()

  useEffect(() => {
    dispatch(thunkGetPosts())
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
