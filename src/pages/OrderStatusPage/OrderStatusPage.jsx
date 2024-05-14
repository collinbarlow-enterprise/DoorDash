import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'


import * as paidOrdersAPI from '../../utilities/paidOrders-api'

import OrdersInProgressListComponent from '../../components/OrdersInProgressListComponent/OrdersInProgressListComponent'

import OrdersDeliveredListComponent from '../../components/OrdersDeliveredListComponent/OrdersDeliveredListComponent'

import '../../../src/orderStatusPageStyle.css'

export default function OrderStatusPage() {
// i'm going to have two main jsx components one that shows the current delivery status of a non-delivery order, and the second will show the order history

// i will need to grab the orders, then parse out completed and unfinished orders

// the completed orders will need to be an array and then mapped over

// how do i want to update the status of the orders? a series of time intervals, that when hit will trigger a database call and update the deliveryStatus field but will also updated the react state value

// state values:
// paidOrders
// deliveredOrders
// ordersInProgress
// orderStatus

const [ paidOrders, setPaidOrders] = useState(null);
const [ deliveredOrders, setDeliveredOrders] = useState([]);
const [ ordersInProgress, setOrdersInProgress ] = useState([]);
const [orderStatus, setOrderStatus ] = useState('');
const [allOrdersDelivered, setAllOrdersDelivered] = useState(false);
const [updateOrderStatusTrigger, setUpdateOrderStatusTrigger] = useState(true);


async function getPaidOrders() {
  const orders = await paidOrdersAPI.getPaidOrders();
  console.log(orders, 'orders in GETPAIDorders')
  setPaidOrders((prevState) => {
    return orders;
  })}

function filterPaidOrders(){
  console.log(paidOrders, 'paidOrders in FILTERPAID')
  const paidOrdersArray = [...paidOrders];
  console.log(paidOrdersArray, 'paidOrdersArray in FILTERPAID')
  const completedOrdersArray = []

  const nonDeliveredOrders = paidOrdersArray.filter(order => order.deliveryStatus !== 'order delivered');
  console.log(nonDeliveredOrders, 'nonDeliveredOrders in filterPaid')
  const deliveredOrders = paidOrdersArray.filter(order => order.deliveryStatus === 'order delivered');
  console.log(deliveredOrders, 'deliveredOrders in filterPaid')

  for (let i = 0; i<paidOrdersArray.length; i++) {
    if (paidOrdersArray[i].deliveryStatus === 'order delivered') {
      paidOrdersArray.splice(i, 1);
      i--;
    } else if (paidOrdersArray[i].deliveryStatus === 'completed') {
        completedOrdersArray.push(paidOrdersArray[i])
      }
    }
    setOrdersInProgress((prevState) => {
      console.log(nonDeliveredOrders, 'paidOrdersArray in setOrdersInProgress')
      return nonDeliveredOrders;
    });
    setDeliveredOrders((prevState) => {
      console.log(deliveredOrders, 'completedOrdersArray in setDeliveredOrders')
      return deliveredOrders;
    });
  }
  // going to look at the paidOrders and separate them out into two groups - one that is not completed and another that is completed


async function updateOrderStatus(){
  console.log('inside update order status')
  const ordersToBeUpated = await paidOrdersAPI.updateOrderStatusAPI(ordersInProgress)
  const updatedOrders = ordersToBeUpated.updatedOrders;
  // console.log(updatedOrders, 'updatedOrderson front end ')
  const nonDeliveredOrders = updatedOrders.filter(order => order.deliveryStatus !== 'order delivered');

  setOrdersInProgress((prevState) => {
    console.log(nonDeliveredOrders, 'NON DELIVERED ORDERS in updateorderStatus')
    return nonDeliveredOrders;
  })
  
  const deliveredOrders = updatedOrders.filter(order => order.deliveryStatus === 'order delivered');
  console.log(deliveredOrders, 'DELIVERED ORDERS in updateOrderStatus')
  setDeliveredOrders(prevState => [...prevState, ...deliveredOrders]);
  if (nonDeliveredOrders.length<1) {
    setUpdateOrderStatusTrigger(false)
  }

;}

useEffect(() => {
  getPaidOrders();
}, [])

useEffect(() => {
  if (paidOrders !== null) {
    filterPaidOrders();
  }
}, [paidOrders]);

useEffect(() => {
  if (updateOrderStatusTrigger){
  // Set up an interval to call updateOrderStatus every 8 seconds
  const intervalId = setInterval(() => {
    updateOrderStatus();

    // Check if all orders are delivered and update the state
    console.log(ordersInProgress, 'ordersInProgress in useEffect')
    if (ordersInProgress.length === 0) {
      setAllOrdersDelivered(true);
      clearInterval(intervalId); // Stop the interval
    }
  }, 8000);

  // Clear the interval when the component is unmounted or if needed
  return () => clearInterval(intervalId);
}}, [ordersInProgress]);

  return (
    <div style={{ marginTop: '75px'}}>
    {paidOrders === null ? (
      <p>Loading...</p>
    ) : (
      <>
        <h2>Order Status Page</h2>
        {ordersInProgress.length > 0 && <OrdersInProgressListComponent orders={ordersInProgress} />}
        {/* <OrdersInProgressListComponent orders={ordersInProgress} /> */}

        {/* <div>Completed</div> */}
        {deliveredOrders.length > 0 && <OrdersDeliveredListComponent orders={deliveredOrders} />}
        <OrdersDeliveredListComponent orders={deliveredOrders} />
        <br />
      </>
    )}
  </div>
);
}