import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useHistory } from "react-router";

const Register = () => {
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
    <section>
      <h3>Create An Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          ></input>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="btn_container">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
