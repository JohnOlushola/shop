import React, { Component } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import TableItem from "../components/TableItem";

import { CART, PRODUCT } from "../apiEndpoints";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentWillMount() {
    // get cart
    axios.defaults.headers.common = {
      Authorization: `bearer ${this.props.auth}`,
    };
    axios
      .get(CART)
      .then((result) => {
        let newCart = [];
        result.data.map((product) => {
          newCart.push(product);
        });

        console.log(newCart[0]._id);

        if (result.data) {
          this.setState({ cart: newCart });
        }
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  render() {
    let itemList = this.state.cart.map((product) => {
      return (
        <TableItem
          item={product}
          key={product._id}
          removeFromCart={this.removeFromCart}
        />
      );
    });

    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <h4>Cart</h4>
          <div className="table-responsive">
            <table className="table table-hover table-sm">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Product ID</th>
                  <th>-</th>
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

export default Cart;
