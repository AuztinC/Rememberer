import React, {useState, useEffect, useRef} from 'react'
import Card from './Card'

//      --- TODOS ---     //

// create final game state
// timer?

export default function Game() {
  const [active, setActive] = useState([])
  const [input, setInput] = useState({val: ""})
  const [inGame, setInGame] = useState(true)
  const [picBank, setPicBank] = useState([])
  const [cardBank, setCardBank] = useState([])
  let score = useRef(0)
  let count = useRef(0)



  useEffect(() => {
    async function fetchCard() {
      setCardBank(Array.from(document.getElementsByClassName("img")))
      let page = Math.ceil(Math.random()*2);
      fetch(`https://pixabay.com/api/?key=35904460-6da0f483724d8177c3f681e67&q=${input.val}&orientation=horizontal&per_page=15&page=${page}`)
          .then((response) => response.json())
          .then((data) => {
            setPicBank(data.hits)
          })
        }
        fetchCard()
        count.current = 0
      }, [input])

    useEffect(() => {
      if(picBank.length === 15 ){
        let cb = [];
          for (let i = 0; i < 15; i++) {
            let curRan = picBank[Math.floor(Math.random() * (picBank.length - 1) )]
            
            if (curRan === undefined) {
              console.log("BLANKS")
          }

          
          if(curRan != undefined){
            cb.push(...[{img: curRan.largeImageURL, id: curRan.id}, {img: curRan.largeImageURL, id: curRan.id}])
          } else {
            
          }
        }
        
        for (let i = 0; i < 3; i++) {
            let tempArr = cb
            .map(card=>({ card, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ card }) => card)
            cb = tempArr;
        }
        setCardBank(cb);
      }

  }, [picBank])


  //    --- Compare cards currently in Active array
  useEffect(() =>{
    console.log(active)
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
    // Array.from(document.getElementsByClassName("card-inner")).forEach((e)=>{
    //   e.style.transform = "rotateY(180deg)"
    // })
    setTimeout(()=>{
      setInput({val: ev.target.input.value})
      // setCardBank([])
      // event.target.input.value = ""
    }, 700)
    
  }

  return (<>
    <form id="form" onSubmit={handleSubmit}>
      <button>New Game</button>
      <label htmlFor="input">Choose Your Images!</label>
      <input type="text" placeholder="Puppies.." name="input" id="input"/>
    </form>

    <div id='game'>
      { cardBank.map((card) => {
        return <>
          <Card id={card.id} img={card.img} active={active} setActive={setActive}/>
        </>
      }) }
    </div>

    </>)
}
