import React, { useEffect } from "react";
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
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";

const Home = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="home_conatiner">
      <div className="users_conatiner">
        {users.map((item) => (
          <User key={item.uid} user={item} selectUser={selectUser} />
        ))}
      </div>

      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messsages">
              {msgs?.map((item, i) => {
                return <Message key={i} msg={item} user1={user1} />;
              })}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <div className="no_conv">Select a user to start Conversation</div>
        )}
      </div>
    </div>
  );
};

export default Home;
