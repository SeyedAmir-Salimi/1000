import cards from "../assets/cards.json";

let gameCards = [...cards];
export function getRandomCard() {
  const max = cards.length;
  const randomIndex = Math.floor(Math.random() * Math.floor(max));

  const newCard = cards[randomIndex];
  gameCards = gameCards.filter((x) => x.id !== newCard.id);
  return newCard;
}

export function tryGetMeldFromHand(hand) {
  return null;
}

export function tryGetMeldFromOtherMelds(hand, otherMelds){
  return null;
}
