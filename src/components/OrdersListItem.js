import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { getProduct } from "../store/actions/products";

const renderOrders = (order, index) => {
  return (
    <div className="container orders-container" key={index}>
      <div className="order-content-container">
        <Link className="Link" to={`/orders/${order._id}`}>
          {order.products.items.map(item => {
            return item.selectedVariant.selectedSize.map((size, i) => {
              return (
                <div
                  key={i}
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
                        className="order-item-img"
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
                        <div className="order-title">{item.product.title}</div>
                        <div className="order-item-color-size-container">
                          <div style={{ display: "flex" }}>
                            <div className="color-text">color:</div>
                            <div className="color-text-value">
                              {item.selectedVariant.variant.attributes.color}
                            </div>
                          </div>
                          <div className="order-item-color-size-comma">,</div>
                          <div style={{ display: "flex" }}>
                            <div className="size-text">size:</div>
                            <div className="size-text-value">{size.size}</div>
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
              );
            });
          })}
        </Link>
        <div className="order-item-arrow">Order Details ></div>
      </div>
    </div>
  );
};

const OrdersListItem = ({ order, cancelOrder, currentUser }) => {
  console.log("order", order);
  return renderOrders(order);
    // return renderOrders(order, index);
    // switch (order.status) {
    //   case "Processing Stock":
    //     return renderOrders(order, index);
    //   case "Ready For Packing":
    //     return renderOrders(order, index);
    //   case "Ready To Deliver":
    //     return renderOrders(order, index);
    //   case "Delivery in Progress":
    //     return renderOrders(order, index);
    //   case "Delivered":
    //     return renderOrders(order, index);
    //   case "Received":
    //     return renderOrders(order, index);
    //   case "Not Delivered":
    //     return renderOrders(order, index);
    // }

    // console.log("order", order);
    // return (
    //   <div
    //     className="row"
    //     style={{
    //       width: "100%"
    //     }}
    //   >
    //     <div className="col-sm-6 address-container">
    //       {/* <p className="delivery-add-title">Delivery Address</p>
    //       <div>
    //         <div className="delivery-customer-name">
    //           {order.shipping.customer_name}
    //         </div>
    //         <div className="delivery-customer-add">{`${
    //           order.shipping.landmark
    //         } ${order.shipping.customer_address_first_line}, ${
    //           order.shipping.customer_address_second_line
    //         }, - ${order.shipping.pincode}`}</div>
    //         <br />
    //         <div>{`Mobile: ${order.shipping.mobile}`}</div>
    //       </div> */}
    //     </div>
    //     <div className="col-md-6">
    //       <div
    //         style={{
    //           display: "flex",
    //           boxShadow: "2px 2px 10px lightgray",
    //           backgroundColor: "#f4f5f7",
    //           margin: "20px 0",
    //           padding: "10px"
    //         }}
    //       >
    //         {order.products.items.map(item => {
    //           return (
    //             <div>
    //               <div />
    //               <div>
    //                 <div>{item.product.title}</div>
    //                 <div>{item.product.description}</div>
    //                 <div>{item.product.prices.sell_price}</div>
    //                 {/* <div>{item.product.prices.mrp}</div> */}
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //       <div className="row">
    //         <div className="col-md-6">
    //           <small style={{ color: "gray" }}>Payable Amount</small>
    //           <div className="">Rs. {order.products.totalPrice}</div>
    //         </div>
    //         <div className="col-md-6">
    //           <small className="" style={{ color: "gray" }}>
    //             Total Quantity
    //           </small>
    //           <div className="">{order.products.totalQty}</div>
    //         </div>
    //       </div>
    //       <button
    //         onClick={() => {
    //           cancelOrder(currentUser.user.id, order._id);
    //         }}
    //       >
    //         Cancel Order
    //       </button>
    //     </div>
    //   </div>
    // );
};

export default connect(
  null,
  { getProduct }
)(OrdersListItem);
