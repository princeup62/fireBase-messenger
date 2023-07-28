import React, { useEffect } from "react";
import "./home2.css";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
import profileIcon from "../assests/profile-icon.png";
import { useHistory } from "react-router-dom";
import Camera from "../components/svg/Camera";

const Home2 = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");

    // query object creation
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let connectios = [];
      querySnapshot.forEach((doc) => {
        connectios.push(doc.data());
      });
      setUsers(connectios);

      console.log("connections🤼", connectios);
    });

    return () => unsub();
  }, []);

  const selectUser = (user) => {
    setChat(user);
    console.log("user<><>", user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const messageRef = collection(db, "messages", id, "chat");

    const q = query(messageRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });

      setMsgs(msgs);
    });
  };

  const handleSubmit = async () => {
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });

    setText("");
  };

  function toggleUserList() {
    const userList = document.getElementById("userList");
    userList.classList.toggle("active");
  }

  function formatDate(date) {
    const formatDate = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000
    );
    return formatDate.toLocaleTimeString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div class="chat-app">
      <div class="sidebar-toggle">
        <div class="menu-icon" onClick={toggleUserList}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Camera />
      </div>
      <div class="user-list" id="userList">
        {users.map((item) => (
          <div
            key={item.uid}
            class="user"
            onClick={() => {
              selectUser(item);
              toggleUserList();
            }}
          >
            <div className="chat-profile-image-wrapper">
              <img
                src={item.avatar ? item.avatar : profileIcon}
                alt="profile"
              />
            </div>

            <text>{item.name}</text>
          </div>
        ))}
      </div>
      <div class="main-chat">
        <div class="chat-messages">
          {msgs?.map((item, i) => {
            return (
              <div
                key={i}
                class={`message ${
                  item.from === user1 ? "outgoing" : "incoming"
                }`}
              >
                {item.text}
                <span className="msg-time-stamp">
                  {formatDate(item.createdAt)}
                </span>
              </div>
            );
          })}

          {!chat && (
            <div className="no_conv">Select a user to start Conversation</div>
          )}
        </div>

        {chat && (
          <div class="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button disabled={text ? false : true} onClick={handleSubmit}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home2;
