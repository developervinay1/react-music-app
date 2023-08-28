import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    const menuItems = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "Upload Music",
            url: "/uploadmusic"
        },
        {
            name: "Contact",
            url: "/contact"
        }
    ]
  return (
    <div>
        <header>
            <div id="brandLogo">
                <h2>Vinay's Music</h2>
            </div>
            <div id="menu">
                <ul>
                    {menuItems.map((data, index) => {
                        return <li key={index}><Link to={data.url}>{data.name}</Link></li>
                    })}
                </ul>
            </div>
        </header>
    </div>
  )
}
