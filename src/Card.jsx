// import React, {useEffect, useState } from 'react'

export default function Card({ setActive, active }) {

    //    --- Add clicked card to "Active" array for comparing
    function handleClick(event){
      if(active.length < 2){
        event.target.parentElement.style.transform = "rotateY(0deg)"
        setActive(prev => [...prev, event.target])
      }
    }

  return (<>
    <div className="card" >
      <div className="card-inner">
        <div className="card-front">
        <img className="img" alt="card"/>
        </div>
        <div className={`card-back`} onClick={handleClick}>
          this is the back
        </div>
      </div>
    </div>
    </>)
}
