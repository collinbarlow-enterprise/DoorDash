import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import { useState } from 'react';


export default function AuthPage({user, setUser}) {

  const [showAuth, setShowAuth] = useState(true);
  return (
    <>
      <h1>AuthPage</h1>
      <button onClick={()=> setShowAuth(!showAuth)}>
      {showAuth ? 'Log In' : 'Sign Up'}</button>
      {showAuth ? <LoginForm setUser={setUser}/> : <SignUpForm setUser={setUser}/> }
      
    </>
  )
}
