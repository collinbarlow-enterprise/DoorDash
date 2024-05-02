import React from 'react';

const OrdersDeliveredListComponent = ({ orders }) => {

  console.log(orders, 'orders in DELIVERED list component')
  return (
    <div className='container'>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <div className='order-info'>Order Status <span>{order.deliveryStatus.toUpperCase()}</span></div>
            <div className='order-info'>Order ID: <span>{order.id}</span></div>
            <div className='order-info'>Order Placed:   <span>
    {
      new Date(order.createdAt).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    }
  </span></div>
            <div className='order-info'>Restaurant: <span>{order.restaurant}</span></div>
            <div className='order-info'>Order Amount: <span>{order.totalPrice}</span></div>
            <div className='order-info'># of Items: <span>{order.lineItems.length}</span></div>
            <ul className="line-items-list">
              {order.lineItems.map(item => (
                <li key={item._id} className="line-item">
                  <div className="left-info">
                    <span className="item-id">Item ID: {item._id}</span>
                    <span className="quantity">Quantity: {item.quantity}</span>
                  </div>
                  <div className="right-info">
                    <span className="price">Price: {item.price}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className='order-info'>Drop Off Instructions: <span>{order.dropOffInstructions}</span></div>
            <div className='order-info'>Order is a Gift? <span>{order.isGift}</span></div>
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OrdersDeliveredListComponent;