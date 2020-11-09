import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Login from "../../components/Login";

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
  afterEach(cleanup);
  jest.mock("../../components/Login");
  const { getByTestId } = renderWithRedux(<Login />);
  const nameInput = getByTestId("nameInput");
  const singelPlayer = getByTestId("SingelPlayer");
  const multiPlayer = getByTestId("MultiPlayer");
  const mockUser = "Amir";

  it("should return error of <Write your name please>", () => {
    user.click(singelPlayer);
    expect(screen.getByText("Write your name please")).toBeInTheDocument();
  });
  it("should no be in the document", () => {
    expect(screen.queryByText("Write your name please")).toBeNull();
  });

  it("should render right input placeholder", () => {
    expect(nameInput.placeholder).toEqual("Please write your name");
  });
  it("should write the name", () => {
    nameInput.placeholder = mockUser;
    expect(nameInput.placeholder).toEqual(mockUser);
  });
  it("should set userName", () => {
    user.type(nameInput, mockUser);
    expect(nameInput.value).toEqual(mockUser);
  });
  it("should cald 1 time the createSingelGameCall", () => {
    singelPlayer.onclick = jest.fn();
    user.click(singelPlayer);
    expect(singelPlayer.onclick).toHaveBeenCalledTimes(1);
  });
  it("should cald 1 time the createMultiplayer ", () => {
    multiPlayer.onclick = jest.fn();
    user.click(multiPlayer);
    expect(multiPlayer.onclick).toHaveBeenCalledTimes(1);
  });
});
