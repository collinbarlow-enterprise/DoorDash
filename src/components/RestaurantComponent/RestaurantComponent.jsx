import React from 'react'
import ItemComponent from '../ItemComponent/ItemComponent'

export default function RestaurantComponent({name, cuisine, menu}) {

const menuMap = menu.map((item, index) =>
  <ItemComponent
  key = {index}
  menuItem = {item}
/>);

  return (
    <div className="container">
      <h6 className="text-center">Restaurant Component</h6>
      <h6>{name}</h6>
      <h6>{cuisine}</h6>
      <h6>{menuMap}</h6>
      
    </div>
  )
}