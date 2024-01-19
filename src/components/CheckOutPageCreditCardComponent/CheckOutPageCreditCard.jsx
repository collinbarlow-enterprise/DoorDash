import React from 'react'

export default function CheckOutPageCreditCard({user}) {

  return (
    <div className="container">
      <h6 className="text-center">CheckOutPage Credit Card Component</h6>
      <div>Payment : {user.creditCard ? (<div>Credit Card is here: {user.creditCard}</div>) : <div>No Credit Card on File</div>}</div>
    </div>
  )
}