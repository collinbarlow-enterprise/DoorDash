import React from 'react'
import ItemComponent from '../ItemComponent/ItemComponent'
import { useNavigate } from 'react-router-dom'

export default function RestaurantComponent({name, cuisine, menu, id}) {
// console.log(id, 'id for restaurant component')
  const navigate = useNavigate();

function toRestaurantPage(id) {
  // console.log(id, 'id in toRestaurantPage function')
    navigate(`/restaurant/${id}`);
  }

const menuMap = menu.map((item, index) =>
  <ItemComponent
  key = {index}
  menuItem = {item}
/>);

const defaultImage = '/no-image.svg';


  return (
    <div className="restaurant-card" onClick={() => toRestaurantPage(id)} style={{ cursor: 'pointer' }}>
      <img src={defaultImage} alt={name} style={{  objectFit: 'cover' }} />
      <div style={{ padding: '10px' }}>
        <h2>{name}</h2>

      </div>
    </div>
  );
}