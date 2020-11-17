import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import AllMelds from "../../components/AllMelds";

const { card1, card2, card3, card4 } = require("../testVariables");

const startingState = {
  uiInfo: {
    user: null,
    otherUser: undefined,
    user1NextMeld: null,
    user2NextMeld: null,
    user3NextMeld: null,
    user4NextMeld: null,
  },
  gameInfo: {
    opponents: {
      User1: { topOfTheMeld: null },
      User2: { topOfTheMeld: null },
      User3: { topOfTheMeld: null },
    },
    topOfTheMeld: null,
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

describe("AllMelds", () => {
  afterEach(cleanup);
  jest.mock("../../components/AllMelds");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  it("should not render any melds", () => {
    renderWithRedux(<AllMelds />);
    expect(screen.queryByTestId("User1Melds")).not.toBeInTheDocument();
    expect(screen.queryByTestId("User2Melds")).not.toBeInTheDocument();
    expect(screen.queryByTestId("User3Melds")).not.toBeInTheDocument();
    expect(screen.queryByTestId("User4Melds")).not.toBeInTheDocument();
  });

  it("should render user melds", () => {
    startingState.gameInfo.opponents.User1.topOfTheMeld = card1;
    startingState.gameInfo.opponents.User2.topOfTheMeld = card2;
    startingState.gameInfo.opponents.User3.topOfTheMeld = card3;
    startingState.gameInfo.topOfTheMeld = card4;
    const { getByTestId } = renderWithRedux(<AllMelds />);
    expect(getByTestId("User1Melds")).toBeInTheDocument();
    expect(getByTestId("User2Melds")).toBeInTheDocument();
    expect(getByTestId("User3Melds")).toBeInTheDocument();
    expect(getByTestId("User4Melds")).toBeInTheDocument();
  });

  it("should render user1NextMeld", () => {
    startingState.uiInfo.user = "xx";
    startingState.uiInfo.user1NextMeld = card4;
    startingState.uiInfo.otherUser = "User1";
    const { getByTestId } = renderWithRedux(<AllMelds />);
    expect(getByTestId("user1NextMeld")).toBeInTheDocument();
  });
  it("should not render user1NextMeld", () => {
    startingState.uiInfo.user = "User1";
    startingState.uiInfo.user1NextMeld = card4;
    startingState.uiInfo.otherUser = "User1";
    renderWithRedux(<AllMelds />);
    expect(screen.queryByTestId("user1NextMeld")).not.toBeInTheDocument();
  });

  it("should render user2NextMeld", () => {
    startingState.uiInfo.user = "XX";
    startingState.uiInfo.user2NextMeld = card4;
    startingState.uiInfo.otherUser = "User2";
    const { getByTestId } = renderWithRedux(<AllMelds />);
    expect(getByTestId("user2NextMeld")).toBeInTheDocument();
  });
  it("should not render user2NextMeld", () => {
    startingState.uiInfo.user = "User2";
    startingState.uiInfo.user2NextMeld = card4;
    startingState.uiInfo.otherUser = "User2";
    renderWithRedux(<AllMelds />);
    expect(screen.queryByTestId("user2NextMeld")).not.toBeInTheDocument();
  });

  it("should render user3NextMeld", () => {
    startingState.uiInfo.user = "XX";
    startingState.uiInfo.user3NextMeld = card4;
    startingState.uiInfo.otherUser = "User3";
    const { getByTestId } = renderWithRedux(<AllMelds />);
    expect(getByTestId("user3NextMeld")).toBeInTheDocument();
  });
  it("should not render user3NextMeld", () => {
    startingState.uiInfo.user = "User3";
    startingState.uiInfo.user3NextMeld = card4;
    startingState.uiInfo.otherUser = "User3";
    renderWithRedux(<AllMelds />);
    expect(screen.queryByTestId("user3NextMeld")).not.toBeInTheDocument();
  });

  it("should render user4NextMeld", () => {
    startingState.uiInfo.user = "XX";
    startingState.uiInfo.user4NextMeld = card4;
    startingState.uiInfo.otherUser = "User4";
    const { getByTestId } = renderWithRedux(<AllMelds />);
    expect(getByTestId("user4NextMeld")).toBeInTheDocument();
  });
  it("should not render user4NextMeld", () => {
    startingState.uiInfo.user = "User4";
    startingState.uiInfo.user4NextMeld = card4;
    startingState.uiInfo.otherUser = "User4";
    renderWithRedux(<AllMelds />);
    expect(screen.queryByTestId("user4NextMeld")).not.toBeInTheDocument();
  });
});
