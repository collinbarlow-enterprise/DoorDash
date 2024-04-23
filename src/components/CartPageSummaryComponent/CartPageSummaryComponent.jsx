import React from 'react'
import '../../../src/cartPageSummaryComponent.css'


export default function CartPageSummaryComponent({cart}) {
    // console.log(cart, 'cart in summary component')
    // console.log(cart.cart, 'cart.cart in summary component')
    // check why cart is wrapped in another cart object

    if (cart === null) {
        return <div>Loading...</div>
    }
  return (
    <div className='container'>
    <div className="summary-container">
    {/* <div className="summary-title">Summary Component Page</div> */}
    <div className="summary-title">Summary</div>
    <div className="summary-item">
      <span>Subtotal:</span>
      <span>${cart.subTotal}</span>
    </div>
    <div className="summary-item">
      <span>Delivery Fees:</span>
      <span>${cart.deliveryFee}</span>
    </div>
    <div className="summary-item">
      <span>Taxes and Fees:</span>
      <span>${cart.taxesAndFees}</span>
    </div>
    <div className="summary-item">
      <span>Total:</span>
      <span><strong>${cart.total}</strong></span>
    </div>
  </div>
  </div>
);
}