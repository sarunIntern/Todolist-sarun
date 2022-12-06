import React, { useState } from 'react'
import Link from 'next/link'

import { FiMenu, FiX } from "react-icons/fi";
function Header() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    return (
        <div className='Header'>
            <div className='header-con'>
                <ul className={click ? "menu active" : " menu"} >
                    <li className="menu-link" onClick={closeMobileMenu}>
                        <Link href="/about">Goabout</Link>
                    </li>

                    <li className="menu-link" onClick={closeMobileMenu}>
                        <Link href="/">GoIndex</Link>
                    </li>
                    <li className="menu-link" onClick={closeMobileMenu}>
                        <Link href="/register">Register</Link>
                    </li>


                </ul>
            </div>
            <div className="mobile-menu" onClick={handleClick}>
                {click ? (

                    <FiX />
                ) : (
                    <FiMenu />
                )}

            </div>
        </div>
    )
}

export default Header