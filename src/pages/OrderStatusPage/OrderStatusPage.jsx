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


async function getPaidOrders() {
  // console.log('hello')
  const orders = await paidOrdersAPI.getPaidOrders();
  console.log(orders, 'orders in getPaid orders')
  setPaidOrders((prevState) => {
    return orders;
  })
  // going to grab the orders from the database and then set the paidOrders value
}

function filterPaidOrders(){
  console.log('goodbye')
  console.log(paidOrders, 'paidOrders in filter orders function')

  const paidOrdersArray = [...paidOrders];
  console.log(paidOrdersArray, 'paidOrdersArray')

  const completedOrdersArray = []

  for (let i = 0; i<paidOrdersArray.length; i++) {
    if (paidOrdersArray[i].deliveryStatus === 'order delivered') {
      paidOrdersArray.splice(i, 1);
      i--;
    } else if (paidOrdersArray[i].deliveryStatus === 'completed') {
        completedOrdersArray.push(paidOrdersArray[i])
      }
    }
    console.log(paidOrdersArray, 'paidOrdersArray after for loop')
    setOrdersInProgress((prevState) => {
      return paidOrdersArray;
    });
    setDeliveredOrders((prevState) => {
      return completedOrdersArray;
    });
  }
  // going to look at the paidOrders and separate them out into two groups - one that is not completed and another that is completed


async function updateOrderStatus(){
  console.log('bon voyage')
  console.log(ordersInProgress, 'orders in porgress in update order status page')
  const ordersToBeUpated = await paidOrdersAPI.updateOrderStatusAPI(ordersInProgress)
  console.log(ordersToBeUpated, 'ordersToBeUpdated')

  const updatedOrders = ordersToBeUpated.updatedOrders;

  console.log(updatedOrders, 'updatedOrderson front end ')
  setOrdersInProgress((prevState) => {
    return updatedOrders;
  });

  // need some sort of timing functionality that looks at the non completed paid orders, grab their order delivery status, if the order delivery status is not complete, we wait for X amount of time, and then update the status to the next step, once its been updated we change the state value and continue forward until the state value is equal to 'completed' 

  // could probably do a while loop
}

useEffect(() => {
  getPaidOrders();
}, [])

useEffect(() => {
  filterPaidOrders();
}, [paidOrders]);

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