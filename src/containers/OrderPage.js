import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { findDOMNode } from "react-dom";
import { updateOrderState } from "../store/actions/orderActions";
import "../CSS/orderDetails.css";

class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {},
      statusColor: ""
    };
  }

  componentDidMount() {
    console.log("something", this.props.orders);

    this.props.orders.orders.map(order => {
      if (order._id === this.props.match.params.order_id) {
        this.setState({ order });
      }
    });
  }

  updateStatus = order => {
    let orderStatusValue = findDOMNode(this.refs.orderStatus).value;

    this.props.updateOrderState(this.props.currentUser.user.id, order._id, {
      status: orderStatusValue
    });
    console.log(orderStatusValue, this.props.currentUser.user.id);
  };

  render() {
    let { order } = this.state;
    if ("status" in order) {
      console.log(order);
      return (
        <div className="container" style={{ marginTop: 25 }}>
          <div>
            <small>Status:</small>{" "}
            <span
              style={{ color: this.state.statusColor }}
              class="order-details-status-value"
            >
              {order.status}
            </span>
          </div>
          <div className="items-container">
            {order.products.items.map(item => {
              // console.log("item", item);
              return item.selectedVariant.selectedSize.map((size, i) => {
                return (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid lightgray",
                        padding: "5px 0"
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div className="order-img-container">
                          <img
                            src={item.selectedVariant.variant.assests.imgs[0]}
                            alt="product img"
                            height="80"
                            width="80"
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <div>
                            <div className="order-title">
                              {item.product.title}
                            </div>
                            <div className="order-item-color-size-container">
                              <div style={{ display: "flex" }}>
                                <div className="color-text">color:</div>
                                <div className="color-text-value">
                                  {
                                    item.selectedVariant.variant.attributes
                                      .color
                                  }
                                </div>
                              </div>
                              <div className="order-item-color-size-comma">
                                ,
                              </div>
                              <div style={{ display: "flex" }}>
                                <div className="size-text">size:</div>
                                <div className="size-text-value">
                                  {size.size}
                                </div>
                              </div>
                            </div>
                            <div className="order-item-price">{`₹ ${
                              item.product.prices.sell_price
                            }`}</div>
                          </div>
                        </div>
                      </div>

                      <div className="item-content-footer-container">
                        <div className="item-content-footer-quantity-container">
                          <div>Qty:</div>
                          <div className="Qty-value-text">{size.qty}</div>
                        </div>
                        <div className="item-content-footer-amount-container">
                          <div>Total:</div>
                          <div className="total-value-text">{`₹ ${
                            size.price
                          }`}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
          <div className="row">
            <div className="col-sm-6 address-container">
              <p className="delivery-add-title">Delivery Address</p>
              <div>
                <div className="delivery-customer-name">
                  {order.shipping.customer_name}
                </div>
                <div className="delivery-customer-add">{`${
                  order.shipping.landmark
                } ${order.shipping.customer_address_first_line}, ${
                  order.shipping.customer_address_second_line
                }, - ${order.shipping.pincode}`}</div>
                <br />
                <div>{`Mobile: ${order.shipping.mobile}`}</div>
              </div>
            </div>

            <div className="col-sm-6 payment-summary-container">
              <p className="payment-summary-title">Payment Summary</p>
              <div className="payment-summary-price-container">
                <div className="payment-summary-content-text">Price</div>
                <div className="payment-summary-content-text">
                  ₹{order.products.totalPrice}
                </div>
              </div>
              <div className="payment-summary-shipping-fee-container">
                <div className="payment-summary-content-text">Shipping Fee</div>
                <div className="payment-summary-content-text">₹ 0</div>
              </div>
              <div className="payment-summary-order-total-container">
                <div className="payment-summary-order-total-title">
                  Order Total
                </div>
                <div className="payment-summary-order-total-value">
                  ₹{order.products.totalPrice}
                </div>
              </div>
            </div>
          </div>
          <div>
            Update Order Status
            <select ref="orderStatus">
              <option value="Select"> Select</option>
              <option value="Processing Stock">Processing Stock</option>
              <option value="Ready For Packing"> Ready For Packing</option>
              <option value="Ready To Deliver"> Ready To Deliver</option>
              <option value="Delivery in Progress">Delivery in Progress</option>
              <option value="Delivered"> Delivered</option>
              <option value="Received"> Received</option>
              <option value="Not Delivered"> Not Delivered</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.updateStatus(order);
              }}
            >
              Update Status
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="empty-order-container">
          <div id="empty-order-title">
            Please go back to Admin Panel and select order again!
          </div>
          <Link
            to="/admin"
            id="empty-order-continue-shopping-btn"
            className="btn btn-lg"
          >
            back to Admin Panel
          </Link>
        </div>
      );
    }
  }
}

function mapStateToProps({ currentUser, orders }) {
  return { currentUser, orders };
}

export default connect(
  mapStateToProps,
  { updateOrderState }
)(OrderPage);
