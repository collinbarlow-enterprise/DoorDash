import React from 'react'
import CheckOutComponent from '../../components/CheckOutComponent/CheckOutComponent'


export default function CheckOutPage() {

// CheckOut Page
// restaurant name
// google maps api that shows the user's address
// delivery time 
// delivery options which will be 3, the premier one will add to the total(how would I accomplish that?), the middle will be the normal one which will just be a set time (should do a RNG with a specific range), and then third will be a scheduled order (goes to another page that has a time wheel, need to look into that more)

// a field for the address (if I want to get ambitious I can swap to a list of addresses that a user can add and delete in a drop down menu)
// a field for drop off instructions (looks like it has its own page, which would have two options and a form field, guess drop off instructions would be a field on the order?)
// phone number
// send as a gift (goes to a page that has a few fields, but actually I don't think this would be that hard, it would just need to change something about the order indicating it was for someone else? maybe another optional field on the order model which would be default to null, but would be orderRecipient, and then on the order summary I could conditionally render based on that value


// Cart Summary
// lists all menu items and ingredients

// Summary Field
// lot of reusable components in both the summary and cart summary - wonder how I could accomplish some sort of reusability, slight UI differences, and really wouldn't be a massive pain to code, but would be cool if I could do it

// total

// payment - going to store this information via the user credit card field 

// conditional rendering for being a chase sapphire member

// conditional rendering for if the order is being scheduled ahead of time, show that time selected 
// place order 



  return (
    <div>
        <h1>Still Under Construction</h1>

        <div>{CheckOutComponent}</div>

        <h1>Check Out Page</h1>
        <div>Restaurant Name</div>
        <div>Google Maps API Section</div>
        <div>Delivery Time Section</div>
        <div>Delivery Options</div>
        <div>User Address</div>
        <div>Drop Off Instructions </div>
        <div>User Phone Number</div>
        <div>Send as a gift</div>

        <div>Cart Summary Section</div>
        {/* seems to be a 3 div container (Quantity x Item, Ingredients, Price), with bootstrap to align things correctly */}
        <div>cart items with price and ingredients </div>
        
        <div>Order Summary</div>
        <div>Add a Promo Field</div>
        <div>Subtotal (which would be order.price)</div>
        <div>Delivery Fee</div>
        <div>Fees and Estimated Tax</div>
        <div>Dasher Tip</div>
        <div>3 recommended options, and one which is 'other' that leads to another page and would update the order</div>
        <div>Total</div>
        <div>Payment</div>
        <div>Conditional Rendering based on Chase Sapphire</div>
        <div>Place Order Button</div>
        
    </div>
  )
}