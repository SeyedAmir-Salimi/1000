import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";

import SearchToJoin from "../../components/MultiPlayer/SearchToJoin";

const startingState = {
  multiInfo: {
    gameRooms: [
      { id: 0, playerNumbers: 1, playerNames: [{ name: "amir" }] },
      {
        id: 1,
        playerNumbers: 2,
        playerNames: [{ name: "nader" }, { name: "omid" }],
      },
    ],
  },
};
function reducer(state = startingState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
// act()
function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}
describe("SearchToJoin", () => {
  jest.mock("../../components/MultiPlayer/SearchToJoin");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  afterEach(cleanup);
  const { getAllByRole, getByTestId } = renderWithRedux(
    <SearchToJoin searchToJoin={true} />
  );
  const roomListTitel = getAllByRole("heading", { level: 3 });
  const gameRoomDiv0 = getByTestId("gameRoom-div0");
  const gameRoomDiv1 = getByTestId("gameRoom-div1");
  gameRoomDiv0.onclick = jest.fn();

  it("should have color yellow", () => {
    user.click(gameRoomDiv0);
    expect(screen.queryByText("Join to room")).toBeInTheDocument();
    expect(gameRoomDiv0.style._values.color).toEqual("yellow");
  });
  it("should have been calded", () => {
    user.click(gameRoomDiv0);
    expect(gameRoomDiv0.onclick).toHaveBeenCalled();
  });
  it("should have color white", () => {
    expect(gameRoomDiv1.style._values.color).toEqual("white");
  });

  it("should to have Players N.", () => {
    expect(roomListTitel[0]).toHaveTextContent("Players N.");
  });
  it("should to have Created By", () => {
    expect(roomListTitel[1]).toHaveTextContent("Created By");
  });
  it("should not be document <Join to room> ", () => {
    expect(screen.queryByText("Join to room")).not.toBeInTheDocument();
  });
});
