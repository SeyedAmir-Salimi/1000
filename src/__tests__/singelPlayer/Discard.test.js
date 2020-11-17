import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Discard from "../../components/Discard";

const startingState = {
  gameInfo:{
    isMyTurn: false,
  }
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
describe("Discard", () => {
  afterEach(cleanup);
  jest.mock("../../components/Discard");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  it("should not render isMyTurn", () => {
    renderWithRedux(<Discard />);
    expect(screen.queryByTestId("Discard")).not.toBeInTheDocument();
  });
  it("should render isMyTurn", () => {
    startingState.gameInfo.isMyTurn = true;
    const { getByTestId } = renderWithRedux(<Discard />);
    expect(getByTestId("Discard")).toBeInTheDocument();
    expect(getByTestId("Discard").className).toEqual("fire");
  });
});
