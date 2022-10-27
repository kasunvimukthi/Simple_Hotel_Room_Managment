import React, { useState } from 'react';
import {FaBars, FaBed,FaMoneyCheck, FaTh,FaUserAlt, FaUserCheck} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({children}) {
    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
    {
        path:"/dashboard",
        name:"Dashboard",
        icon:<FaTh/>
    },
    {
        path:"/rooms",
        name:"Rooms",
        icon:<FaBed/>
    },
    {
        path:"/employees",
        name:"Employees",
        icon:<FaUserAlt/>
    },
    {
        path:"/customers",
        name:"Customers",
        icon:<FaUserCheck/>
    },
    {
        path:"/transaction",
        name:"Transaction",
        icon:<FaMoneyCheck/>
    }
]
  return (
    <div className='container1'>
        <div style={{width: isOpen ? "300px" : "50px"}} className="sidebar bg-light shadow m-3 rounded-5">
            <div className="top_section">
                <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="link rounded-5 mt-1" activeclassName="active">
                        <div className="icon" title={item.name}>{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
    </div>
  )
}
