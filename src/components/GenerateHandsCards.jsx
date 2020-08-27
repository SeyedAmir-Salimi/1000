/* eslint-disable react/display-name */
import "./GenerateHandsCards.css";

import React from "react";
import { useSelector } from "react-redux";

function getBackgroundImage(round) {
  return round % 14;
}

const GenerateHandsCards = () => {
  const round = useSelector((state) => state.gameInfo.round);
  const action = useSelector((state) => state.uiInfo);
  let imageFile = 1;
  if (round >= 1) {
    const backNumber = getBackgroundImage(round);
    imageFile = require(`../assets/images/${backNumber}.png`);
  }
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  let animeCards = [];

  array.forEach((element) => {
    const card = (
      <div
        key={element}
        className={`generateHandsCards GHC${element}_anime`}
        style={{ backgroundImage: `url(${imageFile})` }}
      ></div>
    );
    animeCards.push(card);
  });

  return <>{action.type === "generateHands" ? animeCards : null}</>;
};

export default GenerateHandsCards;
