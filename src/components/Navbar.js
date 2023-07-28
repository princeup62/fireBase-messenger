import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import chatImage from "../assests/chat.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.push("/login");
  };

  return (
    <nav>
      <h3
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        <img
          src={chatImage}
          alt="chat-app"
          style={{ width: "50px", height: "50px" }}
        />
      </h3>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="btn" onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
