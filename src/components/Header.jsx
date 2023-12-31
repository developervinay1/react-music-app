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
        }
    ]
  return (
    <div>
        <header>
            <div id="brandLogo">
                <h5>Vinay's Music</h5>
            </div>
            <div id="menu">
                <ul>
                    {menuItems.map((data, index) => {
                        return <li key={index}><Link to={data.url} className='text-white text-decoration-none'>{data.name}</Link></li>
                    })}
                </ul>
            </div>
        </header>
    </div>
  )
}
