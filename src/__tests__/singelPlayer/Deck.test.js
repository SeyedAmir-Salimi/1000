
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

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
    case "SET_UIINFO": {
      return { ...state, uiInfo: action.payload };
    }
    case "SET_GAMEINFO": {
      return { ...state, gameInfo: action.payload };
    }
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
  it("should not render topOfTheDeck", async () => {
    renderWithRedux(<Deck />);
    expect(screen.queryByTestId("deckCard")).not.toBeInTheDocument();
    expect(screen.queryByTestId("deckCardReplace")).not.toBeInTheDocument();
  });
  it("should render topOfTheDeck", () => {
    startingState.gameInfo.topOfTheDeck = { cardId: "4-hearts", id: 1 };
    const { getByTestId } = renderWithRedux(<Deck />);
    expect(getByTestId("deckCard")).toBeInTheDocument();
  });
  it("should render userid that make a meld and deck replace card", () => {
    startingState.uiInfo = {
      type: "meldFromDeck",
      user: "User3",
      replaceTopofTheDeck: { cardId: "Q-diamonds", id: 1 },
    };
    startingState.gameInfo.topOfTheDeck = { cardId: "4-hearts", id: 1 };

    const { getByTestId } = renderWithRedux(<Deck />);
    expect(getByTestId("deckCard User3_MeldDeck")).toBeInTheDocument();
    expect(getByTestId("deckCardReplace")).toBeInTheDocument();
  });
});
