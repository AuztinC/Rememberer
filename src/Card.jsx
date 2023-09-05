import React, {useEffect, useState } from 'react'

export default function Card({ setActive, active, input, setPicBank }) {
    // const [ranImg, setRanImg] = useState({id: "", img: null})

     //    --- Retrieve images from API
    useEffect(() => {
      let tempNum = Math.floor(Math.random() * 200)
      async function fetchCard() {
        fetch(`https://pixabay.com/api/?key=35904460-6da0f483724d8177c3f681e67&q=${input}&orientation=horizontal&per_page=200`)
            .then((response) => response.json())
            .then((data) => { setPicBank((prev)=> [...prev, data.hits[tempNum].largeImageURL])
              // setRanImg({id: data.hits[tempNum].id, img: data.hits[tempNum].largeImageURL})
            })
        }
          fetchCard()
    }, [input])

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
