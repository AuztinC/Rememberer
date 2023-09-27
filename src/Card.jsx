import React, { useEffect, useState } from 'react'
import QuestionMark from './img/OrangeQuestion.png'

export default function Card({ setInGame, moves, setActive, active, img, id }) {
  const [clicked, setClicked] = useState(false)
    //    --- Add clicked card to "Active" array for comparing
  function handleClick(event){
    if(!clicked){
      if (moves === 0 && active.length < 1) {
        setInGame(true)
      }
      if(active.length < 2){
        event.target.parentElement.style.transform = "rotateY(0deg)"
        setActive(prev => [...prev, event.target])
      }
    }
    setClicked(true)
  }
  useEffect(()=>{
    setTimeout(()=>{
      setClicked(false)
    }, 300)
  }, [clicked])



  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front" >
          <img className="img" alt="card" src={img} />
        </div>
        <div className={`card-back ${id}`} onClick={handleClick}>
          <img src={QuestionMark} alt="?" />
        </div>
      </div>
    </div>
  )
}
