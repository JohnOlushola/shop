import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { REGISTER } from "../apiEndpoints";

function Signup(props) {
  const [isRegistered, setRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    axios
      .post(REGISTER, {
        firstname,
        lastname,
        email,
        password,
      })
      .then((result) => {
        let status = result.status;

        if (status === 200) {
          setRegistered(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (isRegistered) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-container">
      <form className="form-signin">
        {isError && (
          <div class="alert alert-danger" role="alert">
            Some fields are invalid
          </div>
        )}

        <h1 className="mb-3 font-weight-bold text-uppercase">Shop</h1>
        <h1 className="h4 mb-3 font-weight-normal">Register</h1>

        <input
          type="name"
          className="form-control"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          placeholder="Firstname"
        />
        <input
          type="name"
          className="form-control"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          placeholder="Lastname"
        />
        <input
          type="email"
          className="form-control"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          className="form-control"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button onClick={onSubmit} type="button" className="btn-app">
          Sign Up
        </button>

        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
}

export default Signup;
