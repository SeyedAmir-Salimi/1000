import "../Game.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// import io from "socket.io-client";
import { sendMessagesMultiCall } from "../../redux/gameManager";

function Chat({ chatDisplay, chatArchives }) {
  const [chatInput, setChatInput] = useState("");
  const dispatch = useDispatch();
  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessagesMultiCall(chatInput));
    setChatInput("");
  };

  const inputOnChange = (e) => {
    setChatInput(e.target.value);
  };
  const chatWrapperClassname = chatDisplay ? "chat_open" : "chat_close";
  const messages = chatArchives.map((x, index) => (
    <div key={index} className="messages">
      <p>
        {x.name}: {x.message}
      </p>
    </div>
  ));

  const scrollToBottom = () => {
    var div = document.getElementById("style-3");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatArchives]);
  return (
    <div className={chatWrapperClassname}>
      <div className="chat_Wrapper" id="style-3">
        <span className="messages">{messages}</span>
      </div>
      <form onSubmit={(e) => sendMessage(e)} className="chat_form">
        <input
          type="text"
          placeholder="Please write here your message"
          value={chatInput}
          onChange={(e) => inputOnChange(e)}
        />
        <button onClick={(e) => sendMessage(e)} disabled={chatInput === ""}>
          Send
        </button>
      </form>
    </div>
  );
}
Chat.propTypes = {
  chatDisplay: PropTypes.bool,
  chatArchives: PropTypes.array,
};

export default Chat;
