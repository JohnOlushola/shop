import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import TableItem from "../components/TableItem";

import { PRODUCT, CART } from "../apiEndpoints";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      alert: { success: false, error: false },
    };
    this.addToCart = this.addToCart.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentWillMount() {
    // get all products
    axios.defaults.headers.common = {
      Authorization: `bearer ${this.props.auth}`,
    };
    axios
      .get(PRODUCT)
      .then((result) => {
        this.setState({ productList: result.data });
      })
      .catch((err) => {
        this.setState({ alert: { success: false, error: true } });
      });
  }

  addToCart(product) {
    // add product
    axios
      .post(`${CART}/add/${product}`)
      .then((result) => {
        if (result.status === 200) {
          // send alert
          this.setState({ alert: { success: true, error: false } });
        }
      })
      .catch((err) => {
        this.setState({ alert: { success: false, error: true } });
      });
  }

  deleteProduct(id) {
    axios
      .delete(`${PRODUCT}/${id}`)
      .then((result) => {
        if (result.status === 204) {
          // remove from array
          let newProductList = this.state.productList.filter(
            (product) => product.productId !== id
          );
          this.setState({ productList: newProductList });

          // send alert
          this.setState({ alert: { success: true, error: false } });
        } else {
          this.setState({ alert: { success: false, error: true } });
        }
      })
      .catch((err) => {
        this.setState({ alert: { success: false, error: true } });
      });
    // delete product
  }

  render() {
    let itemList = this.state.productList.map((product) => {
      return (
        <TableItem
          item={product}
          key={product._id}
          deleteProduct={this.deleteProduct}
          addToCart={this.addToCart}
        />
      );
    });

    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <h4>Products</h4>
          {this.state.alert.success && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Successful
            </div>
          )}
          {this.state.alert.error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              Oops, something's wrong
            </div>
          )}
          <Link to="/add">  
            Add Product
          </Link>
          <div className="table-responsive">
            <table className="table table-hover table-sm">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Product ID</th>
                  <th>Delete</th>
                  <th>Cart</th>
                </tr>
              </thead>
              <tbody>{itemList}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
