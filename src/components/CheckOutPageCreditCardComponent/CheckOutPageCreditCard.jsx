import React, { useState, useEffect, useCallback } from 'react'

export default function CheckOutPageCreditCard({user}) {
  const [creditCard, setCreditCard] = useState()
  console.log(user, 'user in creditcard checkout')
// may need to create a map or a drop down menu or something that will house all the user credit cards in the array and then the selection will push the selected credit card into a state value and that state value will be used for the order model field

// Function to extract and display the last four digits of the credit card number

function getLastFourDigits(creditCard) {
  // Ensure credit card number is a string
  const ccNumberString = String(creditCard);
  // Get the last four digits
  const lastFourDigits = ccNumberString.slice(-4);
  setCreditCard(lastFourDigits);
};

useEffect(() => {
  getLastFourDigits(user.creditCard);
})

  return (
    <div className="container">
      <div>Credit Card : {user.creditCard ? (<span>...{creditCard}</span>) : <span>No Credit Card on File</span>}</div>
    </div>
  )
}