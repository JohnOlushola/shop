import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/auth";
import { LOGIN } from "../apiEndpoints";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const referer = props.location.referer;

  function onSubmit() {
    axios
      .post(LOGIN, {
        email,
        password,
      })
      .then((result) => {
        let status = result.status;

        if (status === 200) {
          setAuthTokens(result.data.token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to={referer || "/"} />;
  }

  return (
    <div className="auth-container">
      <form className="form-signin">
        {isError && (
          <div className="alert alert-danger" role="alert">
            The email or password provided were incorrect!
          </div>
        )}
        <h1 className="mb-3 font-weight-bold text-uppercase">Shop</h1>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <input
          type="email"
          id="inputEmail"
          className="form-control"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email address"
          required
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          required
        />

        <div className="mb-2">
          <Link to="/register">Don't have an account? Register.</Link>
        </div>

        <button onClick={onSubmit} type="button" className="btn-app">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
