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
  setCardBank(Array.from(document.getElementsByClassName("img")))

}, [])

useEffect(() => {
  if(cardBank.length > 0){
    let tempCards = {
      one: Math.round(Math.random()*cardBank.length -1),
      two: Math.round(Math.random()*cardBank.length -1)
    }
    if(tempCards.one === tempCards.two){
      tempCards.one = Math.round(Math.random()*cardBank.length -1)
    }
    for(let i = 0; i < cardBank.length; i++){
      // console.log(picBank)
      let curRan = picBank[Math.round(Math.random() * picBank.length)]
      // cardBank[i].src = curRan
      // cardBank[i+1].src = curRan
      cardBank[tempCards.one].src = curRan
      // cardBank[tempCards.two].src = curRan
      // cardBank.splice(cardBank[tempCards.one], 1)
      // setCardBank(prev=>[cardBank])
      // setCardBank(prev=>[prev.splice(cardBank[tempCards.two], 1)])
      console.log(cardBank)
    }
  }
}, [cardBank, picBank])

  const data = {
    active: active,
    setActive: setActive,
    input: input,
    setInput: setInput,
    inGame: inGame,
    picBank: picBank,
    setPicBank: setPicBank,
  }
// console.log(cardBank)
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
        Array.from(document.getElementsByClassName("card-inner")).forEach((e)=>{
          e.style.transform = "rotateY(180deg)"
        })
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
        <Card {...data}/>
        <Card {...data}/>
    </div>
    </>)
}
