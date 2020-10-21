import "./Login.css";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createGame } from "../API";
import { reset_game_info } from "../redux/actions/actions";
import { createNewGame } from "../redux/gameManager";

function Login() {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const nameRef = useRef(null);

  const GoToLink = (link) => {
    history.push(link);
  };
  const createSingelGameCall = async (e) => {
    if (user) {
      e.preventDefault();
      setError("");
      setUser("");
      dispatch(reset_game_info());
      const result = await createGame(4, user);
      dispatch(createNewGame(result));
      const gameId = sessionStorage.getItem("Rummy_gameId");
      GoToLink(`/${gameId}`);
    } else {
      setError("Please write your name");
    }
  };
  const singelChangeHandler = (e) => {
    setUser(e.target.value);
  };
  const createMultiplayer = (e) => {
    if (user) {
      e.preventDefault();
      setError("");
      setUser("");
      dispatch(reset_game_info());
      sessionStorage.setItem("Rummy_multi_name", user);
      GoToLink(`/multiPlayer`);
    } else {
      setError("Please write your name");
    }
  };
  return (
    <div className="LoginWrapper">
      <form className="formStyle" onClick={(e) => e.preventDefault()}>
        <span className="InputContainer">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Please write your name"
            onChange={singelChangeHandler}
            value={user}
            ref={nameRef}
          />
          <br />
        </span>
        <span>
          <button className="button_Log" onClick={(e) => createMultiplayer(e)}>
            Multi Player
          </button>
          <button
            className="button_Log"
            onClick={(e) => createSingelGameCall(e)}
          >
            Singel Player
          </button>
        </span>
        {error && (
          <span>
            <h4>{error}</h4>
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;
