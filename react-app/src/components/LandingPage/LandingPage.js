import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css"
import { thunkGetPosts } from "../../store/post";
import { PostDetail } from "../Post";

export const LandingPage = () => {
  const dispatch = useDispatch();

//   const getRestaurants = useSelector((state) => state.restaurant.allRestaurants);
const getPosts = useSelector((state) => state.posts.allPosts)
const posts = Object.values(getPosts)
//   const restaurants = Object.values(getRestaurants);
console.log("posts: ", posts)
  useEffect(() => {
    // dispatch(thunkGetRestaurants());
    dispatch(thunkGetPosts())
  }, [dispatch]);

  return (
    <>
      <div className="post-landing-page-container">
        <PostDetail post={posts} />
      </div>
    </>
  );
};
