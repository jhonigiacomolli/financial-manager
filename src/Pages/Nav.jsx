import './Nav.css'
import React from 'react'
import { Link,  } from 'react-router-dom'
import Logo from '../components/structural/Logo'

function myNav() {
    return (
        <aside className="menu">
            <Logo />
            <div className="menu-itens">
                <Link className="menu-item" to="">
                    <i className="fa fa-calculator"></i>
                        Dashboard
                </Link>
                <Link className="menu-item" to="/lancamento">
                    <i className="fa fa-plus"></i>
                        Novo Lançamento
                </Link>
            </div>
        </aside>
    )
}
export default myNav 