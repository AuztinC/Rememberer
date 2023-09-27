import { useEffect, useState, memo } from "react"
import DownArrow from "./DownArrow"
import ArrowRight from "./ArrowRight"
import ArrowLeft from "./ArrowLeft"
import { CSSTransition } from "react-transition-group"



const DropdownMenu = ({ difficulty, inGame, setOpen }) => {
    const [activeMenu, setActiveMenu] = useState("main")
    const [menuHeight, setMenuHeight] = useState(null)

    // -- Close menu when click outside of dropdown
    window.addEventListener("click", (ev)=>{
        if(ev.target.className !== "menu-item" && ev.target.className !== "catBtn" && ev.target.className.baseVal !== "downArrow"){
            setOpen(false)
        }
    })

    useEffect(()=>{
        const menu = document.querySelector(".imageCat")
        setMenuHeight(window.getComputedStyle(menu).height)
    }, [])

    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props){
        const hashCategory = window.location.hash.substring(1, window.location.hash.indexOf('/'))
        return (<>
            {
                props.dropdown ? (
                    <div
                    className="menu-item"
                    onClick={()=> {
                        props.goToMenu && setActiveMenu(props.goToMenu)
                        }}>
                        <span className="icon-arrow">{props.lefticon}</span>
                        {props.children}
                        <span className="icon-arrow">{props.righticon}</span>
                    </div>
                ) :
                <div
                className={ hashCategory === props.children.toLowerCase() ? "menu-item selectedCat" : "menu-item"}
                onClick={()=> {
                    if(inGame){
                        if(window.confirm("reset?")){
                            window.location.hash = `#${props.children.toLowerCase()}/d=${props.difficulty}`
                            setOpen(false)
                        }
                    } else {
                        window.location.hash = `#${props.children.toLowerCase()}/d=${props.difficulty}`;
                        setOpen(false)
                    }
                    props.goToMenu && setActiveMenu(props.goToMenu)
                }}>
                        <span className="icon-arrow">{props.icon}</span>
                    {props.children}
                </div>
            }

        </>)
    }
    //animals,backgrounds,buildings,business,computer,education,fashion,feelings,food,health,industry,music,nature,people,places,religion,science,sports,transportation,travel

    return (
        <div className="dropdown imageCat" style={{ height: menuHeight }}>
            <CSSTransition
            in={activeMenu === "main"}
            unmountOnExit timeout={500}
            classNames="menu-primary"
            onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem difficulty={difficulty} dropdown={true} righticon={<ArrowRight/>} goToMenu="animals"> Animals</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Backgrounds</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Buildings</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Business</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Computer</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Education</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Fashion</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Feelings</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Food</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Health</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Industry</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Music</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Nature</DropdownItem>
                    <DropdownItem difficulty={difficulty}>People</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Places</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Religion</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Science</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Sports</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Transportation</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Travel</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
            in={activeMenu === "animals"}
            unmountOnExit timeout={500}
            classNames={"menu-secondary"}
            onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem goToMenu={"main"} dropdown={true} lefticon={<ArrowLeft/>}> Back</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Dogs</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Cats</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Horses</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Pigs</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Pandas</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Farm Animals</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Zoo Animals</DropdownItem>
                    <DropdownItem difficulty={difficulty}>Wild Animals</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

const Dropdown = memo(function Dropdown({ difficulty, hash, inGame }) {
    const [open, setOpen] = useState(false)
    const hashCategory = window.location.hash.substring(1, window.location.hash.indexOf('/'))
    useEffect(()=>{
        setOpen(false)
    }, [hash])
    return (<>
        <div className="dropdownCont">
            <button className="catBtn" onClick={() => setOpen(!open)}>
                { hashCategory === "" ? "Image Categories" : decodeURI(hashCategory)}
                <DownArrow setOpen={setOpen} open={open}/>
            </button>
            {open && <DropdownMenu difficulty={difficulty} inGame={inGame} setOpen={setOpen}/>}
        </div>
    </>)
});
export default Dropdown


