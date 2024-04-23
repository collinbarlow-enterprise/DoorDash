import React from 'react'

export default function ChaseSapphireComponent({cart}) {

    console.log (cart, 'cart in chaseSapphire component')

    const savings = -(cart.chaseSavings)
    console.log(savings)
  return (
    <div className="chase-sapphire-container" style={{ backgroundColor: 'teal', color: 'white', padding: '10px' }}>
      {/* <h6 className="text-center">Chase Sapphire  Component</h6> */}
      <div>Saving ${savings} with DashPass + Chase Sapphire</div>
    </div>
  )
}