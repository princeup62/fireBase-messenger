import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router";

const SignIn = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });

      setData({
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
          <h2>Login</h2>

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
            value={loading ? "Loading..." : "Register"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
