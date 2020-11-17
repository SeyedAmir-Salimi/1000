import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import User4Melds from "../../components/User4Melds";

const { card1, card2 } = require("../testVariables");

const startingState = {
  uiInfo: {
    user: null,
    otherUser: undefined,
    user4NextMeld: null,
  },
  gameInfo: {
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

describe("User4Melds", () => {
  afterEach(cleanup);
  jest.mock("../../components/User4Melds");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  it("should not render any melds", () => {
    renderWithRedux(<User4Melds className="User4className" />);
    expect(screen.queryByTestId("User4Melds")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user4NextMeld")).not.toBeInTheDocument();
  });

  it("should render user4 melds", () => {
    startingState.gameInfo.topOfTheMeld = card1;
    startingState.uiInfo.user = "xx";
    startingState.uiInfo.otherUser = "User4";
    startingState.uiInfo.user4NextMeld = card2;
    const { getByTestId } = renderWithRedux(
      <User4Melds className="User4className" />
    );
    expect(getByTestId("User4Melds")).toBeInTheDocument();
    expect(getByTestId("User4Melds").className).toEqual("User4className");
    expect(getByTestId("user4NextMeld")).toBeInTheDocument();
    expect(getByTestId("user4NextMeld").className).toEqual(
      "User4_topOfTheMeld meldSecondCard"
    );
  });
});
