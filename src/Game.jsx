import React, {useState, useEffect, useRef} from 'react'
import Card from './Card'

//      --- TODOS ---     //

// create final game state
// timer?

export default function Game() {
  const [active, setActive] = useState([])
  const [input, setInput] = useState("")
  const [inGame, setInGame] = useState(true)
  const [picBank, setPicBank] = useState([])
  const [cardBank, setCardBank] = useState([])
  let score = useRef(0)



useEffect(() => {
  async function fetchCard() {
    setCardBank(Array.from(document.getElementsByClassName("img")))
    fetch(`https://pixabay.com/api/?key=35904460-6da0f483724d8177c3f681e67&q=${input}&orientation=horizontal&per_page=100`)
        .then((response) => response.json())
        .then((data) => {
          setPicBank(data.hits)
        })
    }
      fetchCard()
  }, [input])





  let count = useRef(0)



useEffect(() => {
 console.log(picBank)
      if(picBank.length === 100 ){
        if(cardBank.length < 30){
          // count = 0
          let curRan = picBank[Math.round(Math.random() * picBank.length -1 )].largeImageURL
          console.log(Math.round(Math.random() * picBank.length -1 ))
          setCardBank(cards=>[...cards, {img: curRan}, {img: curRan}])
          // setCardBank(cards=>[...cards, {img: curRan}])
          
        }
        
      }
      if(cardBank.length === 30 && count.current === 0){
          let tempArr = cardBank
          .map(card=>({ card, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ card }) => card)
          // console.log(tempArr)
          setCardBank(tempArr)
        count.current = 1
      }
      // console.log(cardBank.length)
      }, [picBank, cardBank])


  //    --- Compare cards currently in Active array
  useEffect(() =>{
    if(active.length === 2){
      if(active[0].className === active[1].className){
        score.current = score.current + 2
        setActive([])
        if(score.current === 30){ // --- WINNER
          setInGame(false)
        }
      } else {
        setTimeout(()=>{
          active[0].parentElement.style.transform = "rotateY(180deg)"
          active[1].parentElement.style.transform = "rotateY(180deg)"
          setActive([])
        }, 1000)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.length])

  function handleSubmit(event){
    event.preventDefault()
    if(inGame){
      if(window.confirm("This will reset your current game!")){
        setCardBank([])
        // Array.from(document.getElementsByClassName("card-inner")).forEach((e)=>{
        //   e.style.transform = "rotateY(180deg)"
        // })
        setTimeout(()=>{
          setInput(event.target.input.value)
          event.target.input.value = ""
        }, 700)
      } else return
    }
  }


  return (<>
    <form id="form" onSubmit={handleSubmit}>
      <button>New Game</button>
      <label htmlFor="input">Choose Your Images!</label>
      <input type="text" placeholder="Image Search" name="input" id="input"/>
    </form>
    <div id='game'>
      { cardBank.map((card) => {
        return <>
          <Card img = {card.img} />
        </>
      }) }
        {/* <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/>
        <Card {...data}/> */}
    </div>
    </>)
}
