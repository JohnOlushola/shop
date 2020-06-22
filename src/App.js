import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import Cart from "./components/Cart";
import "./App.css";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("token"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" token={authTokens} component={Home} />
            <PrivateRoute path="/cart" token={authTokens} component={Cart} />
            <PrivateRoute path="/add" token={authTokens} component={AddProduct} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
