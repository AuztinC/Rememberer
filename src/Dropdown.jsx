import { useEffect, useState } from "react"
import DownArrow from "./DownArrow"
import ArrowRight from "./ArrowRight"
import ArrowLeft from "./ArrowLeft"
import { CSSTransition } from "react-transition-group"



function DropdownMenu() {
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
                <a href={`#${props.children.toLowerCase()}`}
                className="menu-item"
                onClick={()=> {
                    props.goToMenu && setActiveMenu(props.goToMenu)
                }}>
                        <span className="icon-arrow">{props.icon}</span>
                    {props.children}
                </a>
            }

        </>)
    }


    // backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music

    //animals,backgrounds,buildings,business,computer,education,fashion,feelings,food,health,industry,music,nature,people,places,religion,science,sports,transportation,travel

    return (
        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition
            in={activeMenu === "main"}
            unmountOnExit timeout={500}
            classNames="menu-primary"
            onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem dropdown={true} righticon={<ArrowRight/>} goToMenu="animals"> Animals</DropdownItem>
                    <DropdownItem>Backgrounds</DropdownItem>
                    <DropdownItem>Buildings</DropdownItem>
                    <DropdownItem>Business</DropdownItem>
                    <DropdownItem>Computer</DropdownItem>
                    <DropdownItem>Education</DropdownItem>
                    <DropdownItem>Fashion</DropdownItem>
                    <DropdownItem>Feelings</DropdownItem>
                    <DropdownItem>Food</DropdownItem>
                    <DropdownItem>Health</DropdownItem>
                    <DropdownItem>Industry</DropdownItem>
                    <DropdownItem>Music</DropdownItem>
                    <DropdownItem>Nature</DropdownItem>
                    <DropdownItem>People</DropdownItem>
                    <DropdownItem>Places</DropdownItem>
                    <DropdownItem>Religion</DropdownItem>
                    <DropdownItem>Science</DropdownItem>
                    <DropdownItem>Sports</DropdownItem>
                    <DropdownItem>Transportation</DropdownItem>
                    <DropdownItem>Travel</DropdownItem>
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
                    <DropdownItem>Dogs</DropdownItem>
                    <DropdownItem>Cats</DropdownItem>
                    <DropdownItem>Horses</DropdownItem>
                    <DropdownItem>Pigs</DropdownItem>
                    <DropdownItem>Pandas</DropdownItem>
                    <DropdownItem>Farm Animals</DropdownItem>
                    <DropdownItem>Zoo Animals</DropdownItem>
                    <DropdownItem>Wild Animals</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

const Dropdown = ({ open, setOpen })=> {

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


