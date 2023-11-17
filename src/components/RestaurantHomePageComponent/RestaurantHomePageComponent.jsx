import React from 'react'
import ItemComponent from '../ItemComponent/ItemComponent'
import { useNavigate } from 'react-router-dom'

export default function RestaurantComponent({name, cuisine, menu, id}) {
// console.log(id, 'id for restaurant component')
  const navigate = useNavigate();

function toRestaurantPage(id) {
  console.log(id, 'id in toRestaurantPage function')
    navigate(`/restaurant/${id}`);
  }

const menuMap = menu.map((item, index) =>
  <ItemComponent
  key = {index}
  menuItem = {item}
/>);

  return (
    <div className="container">
      <h2>{name}</h2>
      <h6 className="text-center">Restaurant Component</h6>
      <div>Image Place Holder</div>
      <button onClick={() => { toRestaurantPage(id) }}> Go to {name} </button>
      {/* <h6>{cuisine}</h6> */}
      {/* <h6>{menuMap}</h6> */}
      
    </div>
  )
}