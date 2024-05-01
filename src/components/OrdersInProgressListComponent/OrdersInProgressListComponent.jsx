import React from 'react';

const OrdersInProgressListComponent = ({ orders }) => {

    console.log(orders, 'orders in list component')
  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
          {/* <div className="cost-item">Delivery Fee: <span>${formatToTwoDecimalPlaces(cart.deliveryFee)}</span></div> */}
          <div className='order-info'>Order Status <span>{order.deliveryStatus}</span></div>
          <div className='order-info'>Order ID: <span>{order.id}</span></div>
          <div className='order-info'>Order Placed: <span>{order.createdAt}</span></div>
          <div className='order-info'>Restaurant: <span>{order.restaurant}</span></div>
          <div className='order-info'>Order Amount: <span>{order.amount}</span></div>
          <div className='order-info'># of Items: <span>{order.lineItems.length}</span></div>

            {/* <p>Order ID: {order.id}</p> */}
            {/* <p>Created At: {order.createdAt}</p> */}
            {/* <p>Delivery Status: {order.deliveryStatus}</p> */}
            {/* Add more details as needed */}
            {/* <h4>Line Items:</h4> */}
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
            <div className='order-info'>Drop Off Instructions: <span>{order.dropOffInstructions}</span></div>
          <div className='order-info'>Order is a Gift? <span>{order.isGift}</span></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersInProgressListComponent;