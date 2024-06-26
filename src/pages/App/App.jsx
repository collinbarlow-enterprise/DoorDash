import { useState, useEffect } from 'react'
// import './App.css'
// import './app.css'
import '../../../src/app.css'
import '../../../src/pages/App/App.css'
import NewOrderPage from '../NewOrderPage/NewOrderPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import AuthPage from '../AuthPage/AuthPage'
import { Routes, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import { getUser } from '../../utilities/users-service';

import HomePage from '../HomePage/HomePage'
import RestaurantPage from '../RestaurantPage/RestaurantPage'
import ItemPage from '../ItemPage/ItemPage'
import SearchPage from '../SearchPage/SearchPage'
import DealPage from '../DealPage/DealPage'
import PastOrderPage from '../PastOrderPage/PastOrderPage'
import CartPage from '../CartPage/CartPage'
import AccountPage from '../AccountPage/AccountPage'
import CheckOutPage from '../CheckOutPage/CheckOutPage'
import OrderStatusPage from '../OrderStatusPage/OrderStatusPage'
import OtherTipPage from '../OtherTipPage/OtherTipPage'

export default function App() {

  const [user, setUser] = useState(getUser())

  function updateUser(userState){
    setUser(userState)
  }
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <main className="App">

      {user ?
        <>
          <NavBar user={user} updateUser={updateUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/restaurant/:id/itempage/:menuId" element={<ItemPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/deals" element={<DealPage />} />
            <Route path="/pastorders" element={<PastOrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/orderstatus" element={<OrderStatusPage />} />
            <Route path="/otherTipPage" element={<OtherTipPage />} />
          </Routes>
        </>
        :
        <AuthPage user={user} setUser={updateUser} />
      }
    </main>
  )
}

