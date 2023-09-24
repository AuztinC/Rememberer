import { useEffect, useState } from "react"

const Dropdown = ({ hash, setDifficulty, difficulty })=>{
    const hashCategory = hash.hash.substring(0, hash.hash.indexOf('/'))
    function DropdownItem(props){
        return (
            <div className="menu">
                <a
                href={`#${hashCategory}/d=${props.children.substring(0, props.children.indexOf(" "))}`}
                className={`menu-item ${difficulty === props.children ? "selectedCat" : ""}`}
                onClick={()=>{
                    setDifficulty(props.children.substring(0, props.children.indexOf(" ")))
                    }}>
                    { props.children }
                </a>
            </div>
        )
    }

    return (<div className="dropdown difficulty">
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} difficulty={difficulty}>5 Pair</DropdownItem>
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} difficulty={difficulty}>10 Pair</DropdownItem>
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} difficulty={difficulty}>15 Pair</DropdownItem>
    </div>)
}



export default function Difficulty({ setDifficulty, difficulty, hash }){
    const [open, setOpen] = useState(false)
    const checkDifficulty = (window.location.hash.substring(window.location.hash.indexOf('=')+1, window.location.hash.length)*1)
    useEffect(()=>{
        setOpen(false)
    }, [hash])
    return (
        <div className="dropdownCont">
            <button className="diffBtn" onClick={() => setOpen(!open)}>
                { checkDifficulty === 0 ? "Difficulty" : `${checkDifficulty} Pair`}
            </button>
            {open && <Dropdown setDifficulty={setDifficulty} hash={hash} difficulty={difficulty}/>}
        </div>
    )

}