import './Logo.css'
import React from 'react'
import logo from '../../assets/images/LogoMicrosite3.png'

function Logo() {
    return (
        <aside className="logo">
            <a href="/financeiro" className="logo">
                <img src={logo} alt="Logomarca" className="logo"/>
            </a>
        </aside>
    )
}

export default Logo