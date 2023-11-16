import React from 'react'

export default function ItemComponent({menuItem}) {

  return (
    <div className="container">
      <h6 className="text-center">Item Component</h6>
      <div>{menuItem.name}</div>
      <div>{menuItem.description}</div>
      <div>{menuItem.price}</div>
    </div>
  )
}