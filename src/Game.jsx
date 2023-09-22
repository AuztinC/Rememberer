import React, {useState, useEffect, useRef} from 'react'
import Card from './Card'
import Dropdown from './Dropdown'
import PlayerStats from './PlayerStats'



export default function Game() {
  const [hash, setHash] = useState({hash: window.location.hash.slice(1)})
  const [active, setActive] = useState([])
  const [inGame, setInGame] = useState(false)
  const [picBank, setPicBank] = useState([])
  const [cardBank, setCardBank] = useState([])
  const [open, setOpen] = useState(false)
  const [moves, setMoves] = useState(0)
  const [bestMoves, setBestMoves] = useState(window.localStorage.getItem("best_moves") || 0)
  const bestTime = window.localStorage.getItem("best_time")*1
  let score = useRef(0)

  const bestDate = new Date();
  bestDate.setHours(0);
  bestDate.setMinutes(0);
  bestDate.setSeconds(0 || bestTime);
  const [bestDateTime, setBestDateTime] = useState({ bestDate })
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  const [timer, setTimer] = useState({ date })

  const currentTimer = useRef()

  useEffect(()=>{
    function startHash(){ // --- Maintain window hash
      setHash({hash: window.location.hash.slice(1)})
      setPicBank([])
    }
    window.addEventListener("hashchange", startHash)
    return () => {
      clearInterval(currentTimer.current)
      window.removeEventListener("hashchange", startHash)
    }
  }, [])


  useEffect(() => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    setTimer({ date })
    clearInterval(currentTimer.current)
    setInGame(false)
    setMoves(0)
    setOpen(false)
    async function fetchCard() { // --- Get images from Pixabay
      setCardBank(Array.from(document.getElementsByClassName("img")))
      let page = Math.ceil(Math.random()*4);
      fetch(`https://pixabay.com/api/?key=35904460-6da0f483724d8177c3f681e67&q=${hash.hash}&orientation=horizontal&per_page=50&page=${page}&safesearch=true`)
          .then((response) => response.json())
          .then((data) => {
            setPicBank(data.hits)
          })
        }
        fetchCard()
      }, [hash])

      useEffect(() => { // --- Once image bank fills up we set 2 images with to same index of picbank.
        // console.log(picBank.length===0)
        if( picBank ){ // I want to check for duplicate images in my cb
          let cb = [];
          for (let i = 0; i < 15; i++) {
            let curRan = picBank[Math.floor(Math.random() * (picBank.length - 1) )]
            const dup = cb.find(cb=>cb.img === curRan.largeImageURL)
            if(dup) {
              i--
              continue
            }
            if(curRan !== undefined){
              cb.push(...[{img: curRan.largeImageURL, id: curRan.id}, {img: curRan.largeImageURL, id: curRan.id}])
            } else {
              // console.log("halt") // --- If we didn't get an image.
              setTimeout(() => {
                setHash(hash)
              }, 1000);
            }
        }
        for (let i = 0; i < 3; i++) { // --- Shuffle our cards.
            let tempArr = cb
            .map(card=>({ card, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ card }) => card)
            cb = tempArr;
        }
        setCardBank(cb);
      }
  }, [picBank])

  useEffect(() =>{ //    --- Compare cards currently in Active array
    if(active.length === 2){
      setMoves(moves + 1)
      if(active[0].className === active[1].className){ // --- Match!
        score.current = score.current + 2
        setActive([])
        if(score.current === 30){ // --- WINNER
          setInGame(false)
          const currentTime = ( ((timer.date.getHours()*60) + timer.date.getMinutes()) * 60 + timer.date.getSeconds())

          if(bestTime !== 0 || currentTime < bestTime){
            window.localStorage.setItem("best_time", currentTime)
            bestDate.setHours(0)
            bestDate.setMinutes(0)
            bestDate.setSeconds(currentTime)
            setBestDateTime( { bestDate } )
          }
          if(bestMoves === 0 || moves < bestMoves){
            window.localStorage.setItem("best_moves", moves)
            setBestMoves(moves)
          }
        }
      } else {
        setTimeout(()=>{ // --- No match
          active[0].parentElement.style.transform = "rotateY(180deg)"
          active[1].parentElement.style.transform = "rotateY(180deg)"
          setActive([])
        }, 1000)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(()=>{
    if(inGame){
      startTimer()
    } else {
      clearInterval(currentTimer.current);
    }
  }, [inGame])

  function startTimer(){
      currentTimer.current = setInterval(()=>{
        date.setSeconds(date.getSeconds() + 1)
        setTimer({date})
        // console.log(date)
      }, 1000)
  }

  function handleSubmit(event){
    event.preventDefault()

  }
  function reset(){
    if(inGame){
      if(window.confirm("This will reset your current game!")){
        Array.from(document.getElementsByClassName("card-inner")).forEach((e)=>{
          e.style.transform = "rotateY(180deg)"
        })
        setTimeout(()=>{
          setHash({hash: hash.hash})
          setOpen(false)
        }, 700)
      } else return

    }
  }

  const pic = picBank.find(pic => pic)
  return (<>
      <form id="form" onSubmit={handleSubmit} >
        <button onClick={reset}>New Game</button>
      </form>
      <Dropdown open={open} setOpen={setOpen}/>
      <PlayerStats bestDateTime={bestDateTime} moves={moves} bestMoves={bestMoves} timer={timer}/>
    <div id='gameBox'>
      { !pic ? <h1>Loading...</h1> : cardBank.map((card) => {
        return (
          <Card setInGame={setInGame} moves={moves} startTimer={startTimer} id={card.id} img={card.img} active={active} setActive={setActive}/>
        )
      }) }
    </div>

    </>)
}
