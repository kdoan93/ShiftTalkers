import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css"

export const PostsLandingPage = () => {
  const dispatch = useDispatch();

//   const getRestaurants = useSelector((state) => state.restaurant.allRestaurants);

//   const restaurants = Object.values(getRestaurants);

  useEffect(() => {
    // dispatch(thunkGetRestaurants());
  }, [dispatch]);

  return (
    <>
      <div className="post-landing-page-container">
        hi
      </div>
    </>
  );
};
