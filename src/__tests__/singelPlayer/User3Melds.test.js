import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import User3Melds from "../../components/User3Melds";

const { card1, card2 } = require("../testVariables");

const startingState = {
  uiInfo: {
    user: null,
    otherUser: undefined,
    user3NextMeld: null,
  },
  gameInfo: {
    opponents: {
      User3: { topOfTheMeld: null },
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

describe("User3Melds", () => {
  afterEach(cleanup);
  jest.mock("../../components/User3Melds");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  it("should not render any melds", () => {
    renderWithRedux(<User3Melds className="User3className" />);
    expect(screen.queryByTestId("User3Melds")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user3NextMeld")).not.toBeInTheDocument();
  });

  it("should render user3 melds", () => {
    startingState.gameInfo.opponents.User3.topOfTheMeld = card1;
    startingState.uiInfo.user = "xx";
    startingState.uiInfo.otherUser = "User3";
    startingState.uiInfo.user3NextMeld = card2;
    const { getByTestId } = renderWithRedux(
      <User3Melds className="User3className" />
    );
    expect(getByTestId("User3Melds")).toBeInTheDocument();
    expect(getByTestId("User3Melds").className).toEqual("User3className");
    expect(getByTestId("user3NextMeld")).toBeInTheDocument();
    expect(getByTestId("user3NextMeld").className).toEqual(
      "User3_topOfTheMeld meldSecondCard"
    );
  });
});
