import React from "react";

const Message = ({ msg, user1 }) => {
  return (
    <div className={`message_wrapper ${msg.from === user1 ? "own" : null}`}>
      <p className={` ${msg.from === user1 ? "text_color_for_me" : null}`}>
        {msg.text}
      </p>
    </div>
  );
};

export default Message;
