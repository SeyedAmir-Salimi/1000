import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import User2Melds from "../../components/User2Melds";

const { card1, card2 } = require("../testVariables");

const startingState = {
  uiInfo: {
    user: null,
    otherUser: undefined,
    user2NextMeld: null,
  },
  gameInfo: {
    opponents: {
      User2: { topOfTheMeld: null },
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

describe("User2Melds", () => {
  afterEach(cleanup);
  jest.mock("../../components/User2Melds");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  it("should not render any melds", () => {
    renderWithRedux(<User2Melds className="User2className" />);
    expect(screen.queryByTestId("User2Melds")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user2NextMeld")).not.toBeInTheDocument();
  });

  it("should render user2 melds", () => {
    startingState.gameInfo.opponents.User2.topOfTheMeld = card1;
    startingState.uiInfo.user = "xx";
    startingState.uiInfo.otherUser = "User2";
    startingState.uiInfo.user2NextMeld = card2;
    const { getByTestId } = renderWithRedux(
      <User2Melds className="User2className" />
    );
    expect(getByTestId("User2Melds")).toBeInTheDocument();
    expect(getByTestId("User2Melds").className).toEqual("User2className");
    expect(getByTestId("user2NextMeld")).toBeInTheDocument();
    expect(getByTestId("user2NextMeld").className).toEqual(
      "User2_topOfTheMeld meldSecondCard"
    );
  });
});
