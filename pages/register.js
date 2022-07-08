import axios from "axios";
import React, { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mainDivStyle = {
    padding: "1em",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "860px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    await axios.post("/api/register", credentials);
  };

  return (
    <div style={mainDivStyle}>
      <form style={formStyle} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password"> Password </label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button> Register </button>
      </form>
    </div>
  );
}
