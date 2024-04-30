import React, { useState, useEffect, useCallback } from 'react'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CheckOutPageDeliveryOptionsComponent({ deliveryOption, setDeliveryOption, selectedDate, setSelectedDate }) {

  const [clickedButton, setClickedButton] = useState(null);
  const [setDeliveryTimeClicked, setSetDeliveryTimeClicked] = useState(false);



  const handleDeliveryOptionChange = (option) => {

    console.log(clickedButton, 'clickedButton')
    setClickedButton(option);
    setDeliveryOption((prevState) => {
      console.log(option, 'option in handleDelivery Change')
      return option;
    })
    if (option === 'scheduleAhead') {
      setSetDeliveryTimeClicked(false);  // Reset on changing delivery option
    }
  };

  const handleSetDeliveryTimeClick = () => {
    setSetDeliveryTimeClicked(true);
    console.log('Place Order', deliveryOption, selectedDate);
    // Add additional functionality for setting delivery time here
  };

  return (
    <div className="container">
      <div>
        <button onClick={() => handleDeliveryOptionChange('standard')}
          className={clickedButton === 'standard' ? 'clicked' : ''}
          // disabled={deliveryOption === 'standard'}
          >
          ASAP
        </button>
        <button onClick={() => handleDeliveryOptionChange('scheduleAhead')}
          className={clickedButton === 'scheduleAhead' ? 'clicked' : ''}
          // disabled={deliveryOption === 'scheduleAhead'}
          >
          Schedule Ahead
        </button>

        {deliveryOption === 'scheduleAhead' && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        )}
{/*     this button on console.logs when the button is clicked
        needs to do something more -> send the scheduled date and time
        to the order document  */}
        {deliveryOption === 'scheduleAhead' && (
          <button 
            onClick={handleSetDeliveryTimeClick} 
            className={setDeliveryTimeClicked ? 'clicked' : ''}
          >
            Set Delivery Time
          </button>
        )}
      </div>
    </div>
  )
}