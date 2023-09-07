import React, { useId } from 'react'

export default function Card({ setActive, active, img, id }) {

    //    --- Add clicked card to "Active" array for comparing
    function handleClick(event){
      if(active.length < 2){
        event.target.parentElement.style.transform = "rotateY(0deg)"
        setActive(prev => [...prev, event.target])
      }
    }
  return <>
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
        <img className="img" alt="card" src={img}/>
        </div>
        <div className={`card-back ${id}`} onClick={handleClick}>
          this is the back
        </div>
      </div>
    </div>
    </>
}
