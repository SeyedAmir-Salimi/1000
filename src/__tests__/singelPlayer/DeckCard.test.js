
import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import DeckCard from "../../components/DeckCard";

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

describe("Deck", () => {
  const card = { cardId: "2-hearts", id: 1 };
  afterEach(cleanup);
  jest.mock("../../components/DeckCard");
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  it("should render image and unChecked radioButton", () => {
    const { getByTestId } = renderWithRedux(
      <DeckCard card={card} className="discard" />
    );
    const deckCardDiv = getByTestId("discard")
    expect(deckCardDiv.style._values).toEqual({
      "background-image": "url(2-hearts.png)",
    });
    expect(getByTestId("MdRadioButtonUnchecked")).toBeInTheDocument();
    expect(
      screen.queryByTestId("IoMdCheckmarkCircleOutline")
    ).not.toBeInTheDocument();
  });

  it("should render checked radioButton", () => {
    const { getByTestId } = renderWithRedux(
      <DeckCard card={card} className="discard" />
    );
    const deckCardDiv = getByTestId("discard")
    deckCardDiv.onclick = jest.fn();
    user.click(deckCardDiv);
    expect(deckCardDiv.onclick).toHaveBeenCalledTimes(1);
    expect(getByTestId("IoMdCheckmarkCircleOutline")).toBeInTheDocument();
    expect(
      screen.queryByTestId("MdRadioButtonUnchecked")
    ).not.toBeInTheDocument()
  });
});
