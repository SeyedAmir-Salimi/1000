import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";

import SearchToJoin from "../../components/MultiPlayer/SearchToJoin";

const startingState = {};
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
describe("Login", () => {
  jest.mock("../../components/MultiPlayer/SearchToJoin");
  jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  afterEach(cleanup);
  const { getByTestId, getAllByRole } = renderWithRedux(
    <SearchToJoin searchToJoin={true} />
  );
  const roomListTitel = getAllByRole("heading", { level: 3 });

  it("should to have Players N.", () => {
    expect(roomListTitel[0]).toHaveTextContent("Players N.");
  });
  it("should to have Created By", () => {
    expect(roomListTitel[1]).toHaveTextContent("Created By");
  });
});
