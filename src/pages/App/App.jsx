import { useState } from 'react'
import './App.css'
import NewOrderPage from '../NewOrderPage/NewOrderPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import AuthPage from '../AuthPage/AuthPage'
import { Routes, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import { getUser } from '../../utilities/users-service';

export default function App() {

  const [user, setUser] = useState(getUser())

  function updateUser(userState){
    setUser(userState)
  }

  return (
    <main className="App">

      {user ?
        <>
          <NavBar user={user} updateUser={updateUser}/>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/restaurant/:id/itempage" element={<ItemPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/deals" element={<DealPage />} />
            <Route path="/pastorders" element={<PastOrderPage />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orderstatus" element={<OrderStatus />} />
          </Routes>
        </>
        :
        <AuthPage user={user} setUser={updateUser} />
      }
    </main>
  )
}

