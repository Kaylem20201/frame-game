import './NavBar.css'
import { useState } from 'react'

function NavBar() {

  return (
    <>
      <div className="NavBar">
        <button name="TestOne">TestOne</button>
        <button name="TestTwo">TestTwo</button>
        <button name="TestThree">TestThree</button>
      </div>
    </>
  );
}

export default NavBar;