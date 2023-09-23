import { useState } from "react"

const Dropdown = ({ hash, setDifficulty })=>{
    const hashCategory = hash.hash.substring(0, hash.hash.indexOf('/'))

    function DropdownItem(props){
        return (
            <div className="menu">
                <a
                href={`#${hashCategory}/d=${props.children.substring((props.children.indexOf('(')+1), (props.children.length-1))}`}
                className="menu-item"
                onClick={()=>{
                    if(props.children === "Easy"){
                        setDifficulty(5)
                    } else if(props.children === "Medium"){
                        setDifficulty(10)
                    } else {
                        setDifficulty(15)
                    }
                    }}>
                    { props.children }
                </a>
            </div>
        )
    }

    return (<div className="dropdown difficulty">
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} >Easy (10)</DropdownItem>
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} >Medium (20)</DropdownItem>
        <DropdownItem hash={hashCategory} setDifficulty={setDifficulty} >Hard (30)</DropdownItem>
    </div>)
}



export default function Difficulty({ difficulty, setDifficulty, hash }){
    const [open, setOpen] = useState(false)

    return (
        <div className="dropdownCont">
            <button className="" onClick={() => setOpen(!open)}>
                Difficulty
            </button>
            {open && <Dropdown setDifficulty={setDifficulty} hash={hash}/>}
        </div>
    )

}