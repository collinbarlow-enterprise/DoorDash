import React, { useState, useEffect, useCallback } from 'react'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CheckOutPageDeliveryOptionsComponent( {deliveryOption, setDeliveryOption, selectedDate, setSelectedDate}) {

    const handleDeliveryOptionChange = (option) => {
        setDeliveryOption((prevState) => {
            console.log(option, 'option in handleDelivery Change')
            return option;
          })
      };

  return (
    <div className="container">
      <h6 className="text-center">CheckOut Page Delivery Options Component</h6>
      <div>
      <button onClick={() => handleDeliveryOptionChange('asap')} disabled={deliveryOption === 'asap'}>
        ASAP
      </button>
      <button onClick={() => handleDeliveryOptionChange('schedule')} disabled={deliveryOption === 'schedule'}>
        Schedule Ahead
      </button>

      {deliveryOption === 'schedule' && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      )}

      <button onClick={() => console.log('Place Order', deliveryOption, selectedDate)}>
        Set Delivery Time
      </button>
    </div>
    </div>
  )
}