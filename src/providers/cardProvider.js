import cards from "../assets/cards.json";

let gameCards = [...cards];
export function getRandomCard() {
  const max = cards.length;
  const randomIndex = Math.floor(Math.random() * Math.floor(max));

  const newCard = cards[randomIndex];
  gameCards = gameCards.filter((x) => x.id !== newCard.id);
  return newCard;
}

export function tryGetMeldFromHand(hand, meld) {
  const melds = hand.reduce((result, item) => {
    if (!result.length) {
      result.push([item]);
    } else if (!result.some((x) => x[0].value === item.value)) {
      result.push([item]);
    } else {
      result = result.map((x) => {
        if (x.some((y) => y.value === item.value)) {
          x.push(item);
        }
        return x;
      });
    }
    return result;
  }, []);

  const filermelds = melds.filter((x) => x.length > 2);

  return filermelds[0];
}

export function tryGetMeldFromOtherMelds(hand, otherMelds) {
  return null;
}
