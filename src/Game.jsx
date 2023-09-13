import React, {useState, useEffect, useRef} from 'react'
import Card from './Card'
import Dropdown from './Dropdown'
import PlayerStats from './PlayerStats'



export default function Game() {
  const [hash, setHash] = useState({hash: window.location.hash.slice(1)})
  const [active, setActive] = useState([])
  const [inGame, setInGame] = useState(true)
  const [picBank, setPicBank] = useState([])
  const [cardBank, setCardBank] = useState([])
  let score = useRef(0)

  useEffect(()=>{
    function startHash(){ // --- Maintain window hash
      setHash({hash: window.location.hash.slice(1)})
      setPicBank([])
    }
    window.addEventListener("hashchange", startHash)
    return () => window.removeEventListener("hashchange", startHash)
  }, [])

  useEffect(() => {
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
      if(active[0].className === active[1].className){ // --- Match!
        score.current = score.current + 2
        setActive([])
        if(score.current === 30){ // --- WINNER
          setInGame(false)
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

  function handleSubmit(event){
    event.preventDefault()
    if(inGame){
      if(window.confirm("This will reset your current game!")){
        reset(event)
      } else return
    } else {
      reset(event)
    }
  }
  function reset(ev){
    Array.from(document.getElementsByClassName("card-inner")).forEach((e)=>{
      e.style.transform = "rotateY(180deg)"
    })
    setTimeout(()=>{
      setHash({hash})
    }, 700)
  }

  const pic = picBank.find(pic => pic)
  return (<>
      <PlayerStats />
      <form id="form" onSubmit={handleSubmit} >
        <button >New Game</button>
        <label  htmlFor="input">Choose Your Images!</label>
        {/* <input  type="text" placeholder={hash.hash} name="input" id="input" defaultValue={hash.hash}/> */}
      </form>
      <Dropdown />
    <div id='game'>
      { !pic ? <h1>Loading...</h1> : cardBank.map((card) => {
        return <>
          <Card id={card.id} img={card.img} active={active} setActive={setActive}/>
        </>
      }) }
    </div>

    </>)
}
