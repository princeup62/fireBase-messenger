import "./signup.css";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        cratedAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });

      history.push("/");
    } catch (error) {
      setData({
        ...data,
        error: error.message,
        loading: false,
      });
    }
  };

  return (
    <div class="loginFormWrapper" onSubmit={handleSubmit}>
      <div class="box">
        <form class="box">
          <h2>Register</h2>
          <div class="inputBox">
            <input
              type="text"
              required
              name="name"
              value={name}
              onChange={handleChange}
            />
            <span>Name</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={handleChange}
            />
            <span>Email</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input
              type="password"
              required
              name="password"
              value={password}
              onChange={handleChange}
            />
            <span>Passsword</span>
            <i></i>
          </div>

          {error && <p className="error">{error}</p>}

          <input
            type="submit"
            value={loading ? "Creating..." : "Register"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
