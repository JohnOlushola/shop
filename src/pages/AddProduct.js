import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { PRODUCT } from "../apiEndpoints";

function AddProduct(props) {
  const [isCreated, setCreated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState("");

  function onSubmit() {
    axios
      .post(PRODUCT, {
        name,
        description,
        price: Number(price),
        productId,
      })
      .then((result) => {
        let status = result.status;

        if (status === 200) {
          setCreated(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (isCreated) {
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
        <h1 className="h4 mb-3 font-weight-normal">Add Product</h1>

        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Description"
        />
        <input
          type="number"
          className="form-control"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="Price"
        />
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setProductId(e.target.value);
          }}
          placeholder="Product ID"
        />
        <button onClick={onSubmit} type="button" className="btn-app">
          Add Product
        </button>

        <Link to="/">All Products</Link>
      </form>
    </div>
  );
}

export default AddProduct;
