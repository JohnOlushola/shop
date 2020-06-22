import React, { Component } from "react";

export default class TableItem extends Component {
  render() {
    let item = this.props.item;

    return (
      <tr>
        <td className="text-capitalize">{item.name}</td>
        <td className="text-capitalize">{item.description}</td>
        <td>{item.price}</td>
        <td>{item.productId}</td>
        {this.props.deleteProduct && <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              this.props.deleteProduct(item.productId);
            }}
          >
            X
          </button>
        </td>}
        {this.props.addToCart && (
          <td>
            {" "}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.props.addToCart(item._id);
              }}
            >
              +
            </button>
          </td>
        )}
      </tr>
    );
  }
}
