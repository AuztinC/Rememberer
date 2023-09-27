import { useEffect, useState, memo } from "react"

const Dropdown = ({ hash, setDifficulty, difficulty, inGame, setOpen })=>{
    const hashCategory = hash.hash.substring(0, hash.hash.indexOf('/'))

    function DropdownItem(props){
        return (
            <div className="menu">
                <div
                className={`menu-item`}
                onClick={()=>{
                    setOpen(false)
                    if(inGame){
                        if(window.confirm("reset?")){
                            window.location.hash = `#${hashCategory}/d=${props.children.substring(0, props.children.indexOf(" "))}`
                        }
                    } else {window.location.hash = `#${hashCategory}/d=${props.children.substring(0, props.children.indexOf(" "))}`;
                    }
                    setDifficulty(props.children.substring(0, props.children.indexOf(" ")))
                    }}>
                    { props.children }
                </div>
            </div>
        )
    }

    return (<div className="dropdown difficulty">
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} difficulty={difficulty}>5 Pair</DropdownItem>
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} difficulty={difficulty}>10 Pair</DropdownItem>
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} difficulty={difficulty}>15 Pair</DropdownItem>
    </div>)
}


const Difficulty = memo(function Difficulty({ setDifficulty, difficulty, hash, inGame }){
    const [open, setOpen] = useState(false)
    const checkDifficulty = (window.location.hash.substring(window.location.hash.indexOf('=')+1, window.location.hash.length)*1)

    window.addEventListener("click", (ev)=>{
        if(ev.target.className !== "menu-item" && ev.target.className !== "diffBtn"){
            setOpen(false)
        }
    })

    useEffect(()=>{
        setOpen(false)
    }, [hash])

    return (
        <div className="dropdownCont">
            <button className="diffBtn" onClick={() => setOpen(!open)}>
                { checkDifficulty === 0 ? "Difficulty" : `${checkDifficulty} Pair`}
            </button>
            {open && <Dropdown setDifficulty={setDifficulty} hash={hash} difficulty={difficulty} setOpen={setOpen}/>}
        </div>
    )

})
export default Difficulty;