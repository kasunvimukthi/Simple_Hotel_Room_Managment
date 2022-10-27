import React, { useState } from 'react';
import {FaBars, FaTh,FaUserAlt} from "react-icons/fa";
import { NavLink } from 'react-router-dom';


export default function Navbar({children}) {
    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
    {
        path:"/dashboard",
        name:"Dashboard",
        icon:<FaTh/>
    },
    {
        path:"/about",
        name:"About",
        icon:<FaUserAlt/>
    }
]
  return (
    <div className='d-flex h-100%'>
    <div style={{width: isOpen ? "150px" : "50px"}} className="bg-primary">
        <div className="d-flex align-items-center p-1 text-white">
            <h5 style={{display: isOpen ? "block" : "none"}} className="ms-2">Logo</h5>
            <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="d-flex ms-2">
                <FaBars onClick={toggle}/>
            </div>
        </div>
        {
            menuItem.map((item, index)=>(
                <NavLink to={item.path} key={index} className="d-flex text-white align-items-center ms-2 p-1" activeclassName="active">
                    <div className="icon">{item.icon}</div>
                    <div style={{display: isOpen ? "block" : "none"}} className="ms-2">{item.name}</div>
                </NavLink>
            ))
        }
    </div>
    <main>{children}</main>
</div>
  )
}
