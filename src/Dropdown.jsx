import { useEffect, useState } from "react"


const subMenu = ()=> {

}


const Dropdown = ()=> {
    const [dropdown, setDropdown] = useState(false)
    const [subMenu, setSubmenu] = useState(false)
    const menuItems = [
        {title: "Animals", href: "#animals", submenu: [
            { title: "House Animals", href:"#house-animals"},
            { title: "Farm Animals", href:"#farm-animals"},
            { title: "Dog", href:"#dog"},
            { title: "Cat", href:"#dog"},
            { title: "Pig", href:"#Pig"},
        ] } ,
        {title: "Backgrounds", href: "#backgrounds" } ,
        {title: "Buildings", href: "#buildings" } ,
        {title: "Business", href: "#business" } ,
        {title: "Computer", href: "#computer" } ,
        {title: "Education", href: "#education" } ,
        {title: "Feelings", href: "#feelings" } ,
        {title: "Food", href: "#food" } ,
        {title: "Health", href: "#health" } ,
        {title: "Industry", href: "#industry" } ,
        {title: "Music", href: "#music" } ,
        {title: "Nature", href: "#nature" } ,
        {title: "People", href: "#people" } ,
        {title: "Places", href: "#places" } ,
        {title: "Religion", href: "#religion" } ,
        {title: "Science", href: "#science" } ,
        {title: "Sports", href: "#sports" } ,
        {title: "Transportation", href: "#transportation" } ,
        {title: "Travel", href: "#travel" } ,
    ]
    useEffect(()=>{
        const menu = document.querySelector('.dropdown-menu').classList
        const links = document.querySelectorAll(".dropdown-menu a")
        // links.forEach((el)=>{
        //     el.addEventListener("click", ()=>{
        //         menu.remove("navToggle")
        //     })
        // })
    }, [])
    function handleClick(){
        const menu = document.querySelector('.dropdown-menu').classList
        menu.toggle("navToggle")
    }
    return (<>
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={handleClick}> Image Categories <span className="carrot"></span></button>
            <ul className={` dropdown-menu ${dropdown ? "menu-show" : ""}`}>
                { menuItems.map((item, index)=>{
                    return (
                        <a href={item.href}>
                            {item.submenu ? (<>
                                <button type="menu-button" aria-haspopup="menu"
                                aria-expanded={dropdown ? "true" : "false"}
                                onClick={() => setSubmenu((prev) => !prev)}>
                                    {item.title}{' '}
                                </button>
                                <ul className={` submenu ${subMenu ? "submenu-show" : ""}`}>
                                    { item.submenu.map((subitem, index) => {
                                        return (
                                            <a href={subitem.href}><li key={index}>{subitem.title}</li></a>
                                        )
                                    })}
                                </ul>
                            </>) : <li className="menu-items" key={index}>
                                {item.title}
                            </li> }

                        </a>
                    )
                })}
            </ul>
        </div>
    </>)
}
export default Dropdown


// backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music