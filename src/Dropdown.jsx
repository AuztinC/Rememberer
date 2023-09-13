import { useEffect, useState } from "react"
import DownArrow from "./DownArrow"
import ArrowRight from "./ArrowRight"
import ArrowLeft from "./ArrowLeft"
import { CSSTransition } from "react-transition-group"



function DropdownMenu({ setOpen }) {
    const [activeMenu, setActiveMenu] = useState("main")
    const [menuHeight, setMenuHeight] = useState(null)

    useEffect(()=>{
        const menu = document.querySelector(".dropdown")
        setMenuHeight(window.getComputedStyle(menu).height)
    }, [])

    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props){
        return (
            <a href="./#"
            className="menu-item"
            onClick={()=> {
                props.goToMenu && setActiveMenu(props.goToMenu)
                }}>
                {props.children}
                <span className="icon-arrow">{props.icon}</span>
            </a>
        )
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition
            in={activeMenu === "main"}
            unmountOnExit timeout={500}
            classNames="menu-primary"
            onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem icon={<ArrowRight/>} goToMenu="animals"> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
            in={activeMenu === "animals"}
            unmountOnExit timeout={500}
            classNames={"menu-secondary"}
            onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem icon={<ArrowRight/>}> HELLO</DropdownItem>
                    <DropdownItem goToMenu={"main"}> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                    <DropdownItem> HELLO</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

const Dropdown = ()=> {
    const [open, setOpen] = useState(false)

    return (<>
        <div className="catCont">
            <button className="catBtn" onClick={() => setOpen(!open)}>
                Image Categories
                <DownArrow />
            </button>
            {open && <DropdownMenu/>}
        </div>
    </>)
}
export default Dropdown


// backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music