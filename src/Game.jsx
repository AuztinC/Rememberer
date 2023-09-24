import React, {useState, useEffect, useRef} from 'react'
import Card from './Card'
import Dropdown from './Dropdown'
import PlayerStats from './PlayerStats'
import Difficulty from './Difficulty'



export default function Game() {
  const [difficulty, setDifficulty] = useState((window.location.hash.substring(window.location.hash.indexOf('=')+1, window.location.hash.length)*1)  || 15)
  const [hash, setHash] = useState({hash: `${window.location.hash.slice(1)}/d=${difficulty}`})
  const [active, setActive] = useState([])
  const [inGame, setInGame] = useState(false)
  const [winner, setWinner] = useState(false)
  const [picBank, setPicBank] = useState([])
  const [cardBank, setCardBank] = useState([])
  const [moves, setMoves] = useState(0)
  const [bestMoves, setBestMoves] = useState(window.localStorage.getItem(`${difficulty}/best_moves`) || 0)
  const bestTime = window.localStorage.getItem(`${difficulty}/best_moves`)*1
  let score = useRef(0)

  const bestDate = new Date();
  bestDate.setHours(0);
  bestDate.setMinutes(0);
  bestDate.setSeconds(bestTime || 0);
  const [bestDateTime, setBestDateTime] = useState({ bestDate })
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  const [timer, setTimer] = useState({ date })

  const currentTimer = useRef()

  useEffect(()=>{


    return () => {
      clearInterval(currentTimer.current)
      window.removeEventListener("hashchange", setHash)
    }
  }, [])


  useEffect(() => {

    async function fetchCard() { // --- Get images from Pixabay
      setCardBank(Array.from(document.getElementsByClassName("img")))
      const page = Math.ceil(Math.random()*4);
      const hashCategory = hash.hash.substring(0, hash.hash.indexOf('/'))
      fetch(`https://pixabay.com/api/?key=35904460-6da0f483724d8177c3f681e67&q=${hashCategory}&orientation=horizontal&per_page=50&page=${page}&safesearch=true`)
          .then((response) => response.json())
          .then((data) => {
            setPicBank(data.hits)
          })
        }
        fetchCard()
      }, [hash, difficulty])

      useEffect(() => { // --- Once image bank fills up we set 2 images with to same index of picbank.
        if( picBank ){ // I want to check for duplicate images in my cb
          let cb = [];
          for (let i = 0; i < difficulty; i++) {
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
                // setHash(hash)
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
      if(active[0].className === active[1].className){ // --- Match!
        score.current = score.current + 2
        setActive([])
        if(score.current === (difficulty*2)){ // --- WINNER
          setWinner(true)
          setInGame(false)
          const currentTime = ( ((timer.date.getHours()*60) + timer.date.getMinutes()) * 60 + timer.date.getSeconds())

          if(bestTime === 0 || currentTime < bestTime){
            window.localStorage.setItem(`${difficulty}/best_moves`, currentTime)
            bestDate.setHours(0)
            bestDate.setMinutes(0)
            bestDate.setSeconds(currentTime)
            setBestDateTime( { bestDate } )
          }
          if(bestMoves === 0 || moves < bestMoves){
            window.localStorage.setItem(`${difficulty}/best_moves`, moves)
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
      setMoves(moves + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(()=>{
    window.addEventListener("hashchange", ()=>{
      if(inGame){
        if(window.confirm("reset?")){
          setHash({hash: `${window.location.hash.slice(1)}/d=${difficulty}`})
        }
      } else setHash({hash: `${window.location.hash.slice(1)}/d=${difficulty}`})
    })
    console.log("from inGame", inGame)
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

  // function reset(){
  //   console.log('restting', inGame)
  //   if(inGame){
  //     console.log('weingame')
  //     if(window.confirm("This will reset your current game!")){
  //       Array.from(document.getElementsByClassName("card-inner")).forEach((e)=>{
  //         e.style.transform = "rotateY(180deg)"
  //       })
  //       setActive([])
  //       setWinner(false)
  //       setInGame(false)
  //       date.setHours(0);
  //       date.setMinutes(0);
  //       date.setSeconds(0);
  //       setTimer({ date })
  //       setMoves(0)
  //       setTimeout(()=>{
  //         setHash({hash: `${window.location.hash.slice(1)}/d=${difficulty}`})
  //       }, 700)
  //     }
  //   } else {
  //     Array.from(document.getElementsByClassName("card-inner")).forEach((e)=>{
  //       e.style.transform = "rotateY(180deg)"
  //     })
  //     setActive([])
  //     setWinner(false)
  //     setInGame(false)
  //     date.setHours(0);
  //     date.setMinutes(0);
  //     date.setSeconds(0);
  //     setTimer({ date })
  //     setMoves(0)
  //     setTimeout(()=>{
  //       setHash({hash: `${window.location.hash.slice(1)}/d=${difficulty}`})
  //     }, 700)

  //   }
  // }

  const pic = picBank.find(pic => pic)
  return (<>
      { inGame || winner ? <button className='newBtn' >New Game</button> : null}
      <Difficulty setDifficulty={setDifficulty} difficulty={difficulty} hash={hash}/>
      <Dropdown hash={hash} difficulty={difficulty}/>
      {/* <button onClick={()=>score.current = 30}>win</button> */}
      <hr></hr>
      <PlayerStats bestDateTime={bestDateTime} moves={moves} bestMoves={bestMoves} timer={timer} difficulty={difficulty}/>

    <div id='gameBox'>
      { !pic ? <h1>Loading...</h1> : cardBank.map((card) => {
        return (
          <Card setInGame={setInGame} moves={moves} startTimer={startTimer} id={card.id} img={card.img} active={active} setActive={setActive}/>
        )
      }) }
    </div>

    </>)
}
