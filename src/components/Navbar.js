import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <span className="text-uppercase">Shop</span>
      </Link>
      <Link to="/cart">
        <span className="text-info">Cart</span>
      </Link>
      <button className="btn btn-light" onClick={logOut}>
        Log out
      </button>
    </nav>
  );
};

export default Navbar;
