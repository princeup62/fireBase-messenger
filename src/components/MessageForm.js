import React from "react";
import Attachement from "./svg/Attachement";

const MessageForm = ({ handleSubmit, text, setText }) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      {/* <label htmlFor="img">
        <Attachement />
      </label>
      <input type="file" accept="image/*" style={{ display: "none" }} /> */}

      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
