import React from 'react'

export default function CheckOutPageCreditCard({user}) {
// may need to create a map or a drop down menu or something that will house all the user credit cards in the array and then the selection will push the selected credit card into a state value and that state value will be used for the order model field
  return (
    <div className="container">
      <h6 className="text-center">CheckOutPage Credit Card Component</h6>
      <div>Payment : {user.creditCard ? (<div>Credit Card is here: {user.creditCard}</div>) : <div>No Credit Card on File</div>}</div>
    </div>
  )
}