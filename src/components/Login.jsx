import "./Login.css";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createGame } from "../API";
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

  const createGameCall = async (e) => {
    if (user) {
      e.preventDefault();
      setError("");
      setUser("");
      const result = await createGame(4, user);
      dispatch(createNewGame(result));
      GoToLink("/start");
    } else {
      setError("Please write your name");
    }
  };
  const singelChangeHandler = (e) => {
    setUser(e.target.value);
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
          <button className="button_Log">Multi Player</button>
          <button className="button_Log" onClick={(e) => createGameCall(e)}>
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
