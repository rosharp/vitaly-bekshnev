import React from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import ImagesSlider from "./ImagesSlider";
import Overlay from "./Overlay";
import emptyCartDark from "../images/empty-cart-dark.svg";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";

export default class Minicart extends Cart {
  constructor(props) {
    super(props);
    this.totalPrice = this.totalPrice.bind(this);
  }

  totalPrice() {
    let totalPrice = 0;

    this.props.cart.forEach((item) => {
      totalPrice +=
        item.prices.filter(
          (price) => price.currency.label === this.props.currency
        )[0].amount * item.qty;
    });
    return this.props.currencySymbol + parseFloat(totalPrice.toFixed(2));
  }

  render() {
    return (
      <div>
        <Overlay
          toggle={this.props.toggleMinicart}
          trigger={this.props.showMinicart}
        />
        <button onClick={this.props.toggleMinicart}>
          <img src={emptyCartDark} alt="empty-cart" />
        </button>
        {this.props.showMinicart ? (
          <div className="cart minicart">
            <div>
              <h2>
                My bag, <span>{this.props.cart.length} items</span>
              </h2>
            </div>
            {this.props.cart.map((item, index) => {
              return (
                <div key={index} className="cart-items-container">
                  <div className="cart-chars">
                    <h3>{item.brand}</h3>
                    <h3>{item.name}</h3>
                    {item.prices
                      .filter(
                        (price) => price.currency.label === this.props.currency
                      )
                      .map((price, index) => {
                        return (
                          <p key={index}>
                            <span>{price.currency.symbol}</span>
                            {parseFloat((price.amount * item.qty).toFixed(2))}
                          </p>
                        );
                      })}

                    {Object.entries(item.chars).map(([char, value], index) => {
                      return (
                        <div key={index}>
                          <h4>{char}:</h4>
                          <div style={{ display: "flex" }}>
                            {item.attributes
                              .filter((att) => att.name === char)[0]
                              ?.items.map((i, index) => {
                                return (
                                  <div key={index}>
                                    {char !== "Color" ? (
                                      <div className="button">
                                        {i.value === value ? (
                                          <label
                                            style={{
                                              backgroundColor: "black",
                                              color: "white",
                                            }}
                                          >
                                            {i.value}
                                          </label>
                                        ) : (
                                          <label>{i.value}</label>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="button-clr">
                                        {i.value === value ? (
                                          <label
                                            style={{
                                              backgroundColor: i.value,
                                              outline: "2px solid #5ece7b",
                                            }}
                                          ></label>
                                        ) : (
                                          <label
                                            style={{ backgroundColor: i.value }}
                                          ></label>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="qty-container">
                    <button
                      className="increase-qty"
                      onClick={() => this.props.onQtyIncrease(item)}
                    >
                      <img src={plus} alt="plus" />
                    </button>
                    <p>{item.qty}</p>
                    <button
                      className="decrease-qty"
                      onClick={() =>
                        item.qty > 1
                          ? this.props.onQtyDecrease(item)
                          : this.props.onCartItemDelete(item)
                      }
                    >
                      <img src={minus} alt="minus" />
                    </button>
                  </div>

                  <ImagesSlider
                    item={item}
                    index={index}
                    cart={this.props.cart}
                    sliderButtons={false}
                  />
                </div>
              );
            })}

            <div className="cart-total-container">
              <span>Total:</span>
              <b>{this.totalPrice()}</b>
            </div>
            <div className="button-container">
              <Link
                onClick={this.props.toggleMinicart}
                className="button-outline"
                to="/cart"
              >
                <button>View Bag</button>
              </Link>
              <Link
                onClick={this.props.toggleMinicart}
                id="checkout-btn"
                className="checkout-btn"
                to="/checkout"
              >
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
