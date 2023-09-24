import { useEffect, useState } from "react"
import DownArrow from "./DownArrow"
import ArrowRight from "./ArrowRight"
import ArrowLeft from "./ArrowLeft"
import { CSSTransition } from "react-transition-group"



function DropdownMenu({ difficulty }) {
    const [activeMenu, setActiveMenu] = useState("main")
    const [menuHeight, setMenuHeight] = useState(null)

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
                <a href={`#${props.children.toLowerCase()}/d=${props.difficulty}`}
                className={ hashCategory === props.children.toLowerCase() ? "menu-item selectedCat" : "menu-item"}
                onClick={()=> {
                    props.goToMenu && setActiveMenu(props.goToMenu)
                }}>
                        <span className="icon-arrow">{props.icon}</span>
                    {props.children}
                </a>
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

const Dropdown = ({ difficulty, hash })=> {
    const [open, setOpen] = useState(false)
    const hashCategory = window.location.hash.substring(1, window.location.hash.indexOf('/'))
    useEffect(()=>{
        setOpen(false)
    }, [hash])
    return (<>
        <div className="dropdownCont">
            <button className="catBtn" onClick={() => setOpen(!open)}>
                { hashCategory === "" ? "Image Categories" : hashCategory}
                <DownArrow />
            </button>
            {open && <DropdownMenu difficulty={difficulty}/>}
        </div>
    </>)
}
export default Dropdown


