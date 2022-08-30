import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { Loader } from "../components/generic";
import styled from "styled-components";
import { refreshToken } from "../utils/agent";

const FormContainer = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
`;

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    console.log("useeffect login");
    //check if localStorage

    let rfToken = localStorage.getItem("refreshToken");

    console.log(rfToken);

    if (!rfToken) {
      setLoader(false);
      return;
    } //dont proceed

    refreshToken(rfToken)
      .then((jwtToken) => {
        setCookie("jwt", jwtToken);
        setCookie("rfToken", rfToken);
        router.push("/");
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "860px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    const { data } = await axios.post("/api/login", credentials);

    //save the jwt token and refresh token in the localstorage
    localStorage.setItem("jwt", data.response.jwt);
    localStorage.setItem("refreshToken", data.response.refreshToken);

    //create cookie
    setCookie("jwt", data.response.jwt);
    setCookie("rfToken", data.response.refreshToken);

    //navigate to index page after sucessfull login
    router.push("/");
  };

  const handleGetUser = async () => {
    const user = await axios.get("/api/user");
    // console.log(user);
  };

  const handleLogOut = async () => {
    const user = await axios.get("/api/logout");
    console.log(user);
  };

  return (
    <div>
      <FormContainer>
        <form style={formStyle} onSubmit={(e) => handleSubmit(e)}>
          {loader && <Loader />}

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

          <button> Log in </button>
        </form>
      </FormContainer>

      <button onClick={() => handleGetUser()}> User </button>

      <button onClick={() => handleLogOut()}> Logout </button>
    </div>
  );
}
