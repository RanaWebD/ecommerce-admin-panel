import React, { Component } from "react";
// COMPONENT
import OrdersList from "./OrdersList";
// CSS
import "../CSS/orders.css";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changeOrderList: "Processing Stock"
    };
  }
  render() {
    let { orders, cancelOrder, currentUser } = this.props;
    if (orders.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-3" id="orders-side-navbar-container" >
            <div
              className="btn orders-side-navbar-btn"
              onClick={() =>
                this.setState({ changeOrderList: "Processing Stock</" })
              }
            >
              Processing Stock
            </div>
            <div
              className="btn orders-side-navbar-btn"
              onClick={() =>
                this.setState({ changeOrderList: "Ready For Packing" })
              }
            >
              Ready For Packing
            </div>
            <div
              className="btn orders-side-navbar-btn"
              onClick={() =>
                this.setState({ changeOrderList: "Ready To Deliver" })
              }
            >
              Ready To Deliver
            </div>
            <div
              className="btn orders-side-navbar-btn"
              onClick={() =>
                this.setState({ changeOrderList: "Delivery in Progress" })
              }
            >
              Delivery in Progress
            </div>
            <div
              className="btn orders-side-navbar-btn"
              onClick={() => this.setState({ changeOrderList: "Delivered" })}
            >
              Delivered
            </div>
            
            <div
              className="btn orders-side-navbar-btn"
              onClick={() => this.setState({ changeOrderList: "Received" })}
            >
              Received
            </div>
            <div
              className="btn orders-side-navbar-btn"
              onClick={() =>
                this.setState({ changeOrderList: "Not Delivered" })
              }
            >
              Not Delivered
            </div>
          </div>
          <div className="col-sm-9">
            <OrdersList
              changeOrderList={this.state.changeOrderList}
              orders={orders}
              cancelOrder={cancelOrder}
              currentUser={currentUser}
            />
          </div>
        </div>
      );
    } else {
      return <div>You didn't place any order until now</div>;
    }
  }
}

export default Orders;
