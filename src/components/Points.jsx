import React from "react";
import { useSelector } from "react-redux";

function Points() {
  const userPoints = useSelector((state) => state.gameInfo.points);
  return (
    <div>
      <h4>User1: {userPoints.User1 ? userPoints.User1 : 0}</h4>
      <h4>User2: {userPoints.User2 ? userPoints.User2 : 0}</h4>
      <h4>User3: {userPoints.User3 ? userPoints.User3 : 0}</h4>
      <h4>You: {userPoints.User4 ? userPoints.User4 : 0}</h4>
    </div>
  );
}

export default Points;
