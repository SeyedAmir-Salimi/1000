import "../Game.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Chat({ chatDisplay }) {
  const [chatInput, setChatInput] = useState("");
  const [chatArchives, setchatArchives] = useState([]);

  const socket = io("http://localhost:3000");
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const username = sessionStorage.getItem("Rummy_multi_name");
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      username,
      gameId,
      message: "chat",
      text: { name: username, message: chatInput },
    });
    // setchatArchives([...chatArchives, { name: "You", message: chatInput }]);
    setChatInput("");
  };
  const name = sessionStorage.getItem("Rummy_multi_name");
  const userId = sessionStorage.getItem("Rummy_UserUniqId");
  useEffect(() => {
    socket.emit("join", { name, gameId, userId }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.off("join");
    };
  });
  useEffect(() => {
    scrollToBottom();
    socket.on("chatMessage", (data) => {
      console.log("chatMessage", data);
      // setchatArchives([...chatArchives, data.message.text]);
      setchatArchives((chatArchives) => [...chatArchives, data.message.text]);
      scrollToBottom();
    });
    // return () => {
    //   socket.off("chatMessage");
    // };
  }, []);

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
  useEffect(() => {
    scrollToBottom();
    socket.on(gameId, (data) => {
      if (data.message === "chat") {
        setchatArchives([...chatArchives, data.text]);
        scrollToBottom();
      }
    });
    return () => {
      socket.off(gameId);
    };
  });
  const scrollToBottom = () => {
    var div = document.getElementById("style-3");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  };
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
};

export default Chat;
