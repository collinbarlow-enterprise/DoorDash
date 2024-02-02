import React from 'react';

const OrdersInProgressListComponent = ({ orders }) => {

    console.log(orders, 'orders in list component')
  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Created At: {order.createdAt}</p>
            <p>Delivery Status: {order.deliveryStatus}</p>
            {/* Add more details as needed */}
            <h4>Line Items:</h4>
            <ul>
              {order.lineItems.map(item => (
                <li key={item._id}>
                  <p>Item ID: {item._id}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                  {/* Add more details as needed */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersInProgressListComponent;