import React from "react";
// COMPONENT
import OrdersListItem from "./OrdersListItem";
// CSS
// import "../CSS/productsPage.css";

const OrdersList = ({ orders, cancelOrder, currentUser, changeOrderList }) => {
  if (orders.length > 0) {
    return orders.map((order, index) => {
      if(order.status === changeOrderList ){
        return (
          <div className="row" key={index}>
            <OrdersListItem
              order={order}
              cancelOrder={cancelOrder}
              currentUser={currentUser}
            />
          </div>
        );        
      }
    })

  }else{
    return <div>Empty!</div>;
  }
};

export default OrdersList;
