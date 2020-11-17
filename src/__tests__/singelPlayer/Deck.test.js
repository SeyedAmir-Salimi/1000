
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
const { card1, card2, card3 } = require("../testVariables");
import Deck from "../../components/Deck";

const startingState = {
  uiInfo: {
    type: null,
    user: null,
    replaceTopofTheDeck: null,
  },
  gameInfo: {
    topOfTheDeck: null,
  },
};
function reducer(state = startingState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}
describe("Deck", () => {
  afterEach(cleanup);
  jest.mock("../../components/Deck");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  it("should not render topOfTheDeck", () => {
    renderWithRedux(<Deck />);
    expect(screen.queryByTestId("deckCard")).not.toBeInTheDocument();
    expect(screen.queryByTestId("deckCardReplace")).not.toBeInTheDocument();
  });
  it("should render topOfTheDeck", () => {
    startingState.gameInfo.topOfTheDeck = card1;
    const { getByTestId } = renderWithRedux(<Deck />);
    expect(getByTestId("deckCard")).toBeInTheDocument();
  });
  it("should render userid that make a meld and deck replace card", () => {
    startingState.uiInfo = {
      type: "meldFromDeck",
      user: "User3",
      replaceTopofTheDeck: card2,
    };
    startingState.gameInfo.topOfTheDeck = card3;

    const { getByTestId } = renderWithRedux(<Deck />);
    expect(getByTestId("deckCard User3_MeldDeck")).toBeInTheDocument();
    expect(getByTestId("deckCardReplace")).toBeInTheDocument();
  });
});
