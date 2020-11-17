import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import User1Melds from "../../components/User1Melds";

const { card1, card2 } = require("../testVariables");

const startingState = {
  uiInfo: {
    user: null,
    otherUser: undefined,
    user1NextMeld: null,
  },
  gameInfo: {
    opponents: {
      User1: { topOfTheMeld: null },
    },
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

describe("User1Melds", () => {
  afterEach(cleanup);
  jest.mock("../../components/User1Melds");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  it("should not render any melds", () => {
    renderWithRedux(<User1Melds className="User1className" />);
    expect(screen.queryByTestId("User1Melds")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user1NextMeld")).not.toBeInTheDocument();
  });

  it("should render user1 melds", () => {
    startingState.gameInfo.opponents.User1.topOfTheMeld = card1;
    startingState.uiInfo.user = "xx";
    startingState.uiInfo.otherUser = "User1";
    startingState.uiInfo.user1NextMeld = card2;
    const { getByTestId } = renderWithRedux(
      <User1Melds className="User1className" />
    );
    expect(getByTestId("User1Melds")).toBeInTheDocument();
    expect(getByTestId("User1Melds").className).toEqual("User1className");
    expect(getByTestId("user1NextMeld")).toBeInTheDocument();
    expect(getByTestId("user1NextMeld").className).toEqual(
      "User1_topOfTheMeld meldSecondCard"
    );
  });
});
