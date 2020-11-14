import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Card from "../../components/Card";

const startingState = {
  gameInfo: {
    isMyTurn: false,
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
const cards = { cardId: "2-hearts", id: 1 };
describe("card", () => {
  jest.mock("../../components/Card");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  afterEach(cleanup);

  it("should change className after click", () => {
    const { getByTestId } = renderWithRedux(
      <Card index={0} card={cards} isDiscarded={false} isMeld={false} />
    );
    const cardDiv = getByTestId("card-div");
    expect(cardDiv.className).toEqual("card card0 ");

    cardDiv.onclick = jest.fn();
    user.click(cardDiv);
    expect(cardDiv.onclick).toHaveBeenCalledTimes(1);
    expect(cardDiv.className).toEqual("card card0 SelectedCard");
    expect(cardDiv.style._values).toEqual({
      "background-image": "url(2-hearts.png)",
    });
  });
  it("should change className to discard", () => {
    const { getByTestId } = renderWithRedux(
      <Card index={0} card={cards} isDiscarded={true} isMeld={false} />
    );
    const cardDiv = getByTestId("card-div");
    expect(cardDiv.className).toEqual("card card0 user4_discarding");
  });
  it("should change className to meld", () => {
    const { getByTestId } = renderWithRedux(
      <Card index={0} card={cards} isDiscarded={false} isMeld={true} />
    );
    const cardDiv = getByTestId("card-div");
    expect(cardDiv.className).toEqual("card card0 user4_Meld");
  });

});
