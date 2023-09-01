import React, {useState, useEffect, useRef} from 'react'
import Card from './Card'

//      --- TODOS ---     //

// create final game state
// timer?

export default function Game() {
  const [active, setActive] = useState([])
  const [input, setInput] = useState("")
  const [inGame, setInGame] = useState(true)
  let score = useRef(0)

  const data = {
    active: active,
    setActive: setActive,
    input: input,
    setInput: setInput,
  }

  //    --- Compare cards currently in Active array
  useEffect(() =>{
    if(active.length === 2){
      if(active[0].className === active[1].className){
        score.current = score.current + 2
        setActive([])
        console.log(score.current)
        if(score.current === 30){ // --- WINNER
          console.log("YOU WIH")
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
    setInput(event.target.input.value)
    event.target.input.value = ""
  }

  return (<>
    <form id="form" onSubmit={handleSubmit}>
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
    </div>
    </>)
}
