
import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import MultiPlayer from "../../components/MultiPlayer/MultiPlayer";

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
describe("MultiPlayer", () => {
  afterEach(cleanup);
  jest.mock("../../components/MultiPlayer/MultiPlayer");
  const { getByTestId } = renderWithRedux(<MultiPlayer />);
  const CreateGameButton = getByTestId("CreateGameButton");
  const SearchtojoinButton = getByTestId("SearchtojoinButton");
  // const SearchtojoinButton = screen.getByRole("button", {
  //   name: "Search to join",
  // });

  it("should call CreateGameButton function", () => {
    CreateGameButton.onclick = jest.fn();
    user.click(CreateGameButton);
    expect(CreateGameButton.onclick).toHaveBeenCalledTimes(1);
  });
  it("should contain Create Game", () => {
    expect(CreateGameButton).toHaveTextContent("Create Game");
  });

  it("should call searchTojoin function", () => {
    SearchtojoinButton.onclick = jest.fn();
    user.click(SearchtojoinButton);
    expect(SearchtojoinButton.onclick).toHaveBeenCalledTimes(1);
  });
  it("should contain Search to join", () => {
    expect(SearchtojoinButton).toHaveTextContent("Search to join");
  });
});
