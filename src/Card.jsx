import React, {useEffect, useState } from 'react'

export default function Card({ setActive, active, input, game }) {
    const [ranImg, setRanImg] = useState({id: "", img: null})

     //    --- Retrieve images from API
    useEffect(() => {
      if(!game){
        let tempNum = Math.floor(Math.random() * 20)
        async function fetchCard() {
          fetch(`https://pixabay.com/api/?key=35904460-6da0f483724d8177c3f681e67&q=${input}`)
              .then((response) => response.json())
              .then((data) => {setRanImg({id: data.hits[tempNum].id, img: data.hits[tempNum].largeImageURL})})
          }
            fetchCard()
      }
    }, [input])

    //    --- Add clicked card to "Active" array for comparing
    function handleClick(event){
      if(active.length < 2){
        event.target.parentElement.style.transform = "rotateY(0deg)"
        setActive(prev => [...prev, event.target])
      }
    }

    //    --- Create two identical cards
  return (<>
    <div className="card" >
      <div className="card-inner">
        <div className="card-front">
        <img className="img" alt="card" src={ranImg.img} />
        </div>
        <div className={`card-back ${ranImg.id}`} onClick={handleClick}>
          this is the back
        </div>
      </div>
    </div>

    <div className='card'>
      <div className="card-inner">
        <div className="card-front">
        <img className="img" alt="card" src={ranImg.img} />
        </div>
        <div className={`card-back ${ranImg.id}`} onClick={handleClick}>
          this is the back
        </div>
      </div>
    </div>
    </>)
}
