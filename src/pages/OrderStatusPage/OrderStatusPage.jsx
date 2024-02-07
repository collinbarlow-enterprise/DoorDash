import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'


import * as paidOrdersAPI from '../../utilities/paidOrders-api'

import OrdersInProgressListComponent from '../../components/OrdersInProgressListComponent/OrdersInProgressListComponent'

import OrdersDeliveredListComponent from '../../components/OrdersDeliveredListComponent/OrdersDeliveredListComponent'


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

const [ paidOrders, setPaidOrders] = useState([]);
const [ deliveredOrders, setDeliveredOrders] = useState([]);
const [ ordersInProgress, setOrdersInProgress ] = useState([]);
const [orderStatus, setOrderStatus ] = useState('');
const [allOrdersDelivered, setAllOrdersDelivered] = useState(false);
const [updateOrderStatusTrigger, setUpdateOrderStatusTrigger] = useState(true);


async function getPaidOrders() {
  const orders = await paidOrdersAPI.getPaidOrders();
  console.log(orders, 'orders in getPaid orders')
  setPaidOrders((prevState) => {
    return orders;
  })}

function filterPaidOrders(){
  const paidOrdersArray = [...paidOrders];
  const completedOrdersArray = []

  for (let i = 0; i<paidOrdersArray.length; i++) {
    if (paidOrdersArray[i].deliveryStatus === 'order delivered') {
      paidOrdersArray.splice(i, 1);
      i--;
    } else if (paidOrdersArray[i].deliveryStatus === 'completed') {
        completedOrdersArray.push(paidOrdersArray[i])
      }
    }
    setOrdersInProgress((prevState) => {
      return paidOrdersArray;
    });
    setDeliveredOrders((prevState) => {
      return completedOrdersArray;
    });
  }
  // going to look at the paidOrders and separate them out into two groups - one that is not completed and another that is completed


async function updateOrderStatus(){
  const ordersToBeUpated = await paidOrdersAPI.updateOrderStatusAPI(ordersInProgress)
  const updatedOrders = ordersToBeUpated.updatedOrders;
  console.log(updatedOrders, 'updatedOrderson front end ')
  const nonDeliveredOrders = updatedOrders.filter(order => order.deliveryStatus !== 'order delivered');

  setOrdersInProgress((prevState) => {
    return nonDeliveredOrders;
  })
  
  const deliveredOrders = updatedOrders.filter(order => order.deliveryStatus === 'order delivered');
  setDeliveredOrders(prevState => [...prevState, ...deliveredOrders]);
  if (nonDeliveredOrders.length<1) {
    setUpdateOrderStatusTrigger(false)
  }

;}

useEffect(() => {
  getPaidOrders();
}, [])

useEffect(() => {
  filterPaidOrders();
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
    <div>
        <h1>Still Under Construction</h1>
        <h1>Order Status Page</h1>
        <button onClick={() => updateOrderStatus()}> update order status button</button>
        <div>First Component is going to be undelivered orders</div>
        <OrdersInProgressListComponent orders = {ordersInProgress}
        />
        

      <div onClick={() => filterPaidOrders()} ><button>filterPaidOrders</button></div>

        <div>Second Component is going to be delivered orders </div>
        <div>Completed</div>

        <OrdersDeliveredListComponent orders = {deliveredOrders}
        />
        {/* some sort of map */}
        <div>Restaurant Name | a button that takes you back to the restaurant page</div>
        <div>Order Date | Order Amount | # of Items</div>
        <div>List the items out</div>
        <div>button to reorder | button to view receipt</div>
    </div>
  )
}