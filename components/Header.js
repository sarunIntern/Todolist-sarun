import React, { useState, useEffect } from 'react'
import Link from 'next/link' 

import { requesttoken } from '../function/Auth/Auth';
import { FiMenu, FiX } from "react-icons/fi";
// export const getServerSideProps = async() => {
//     try{
//         const result = await requesttoken()
//         const data = await result.data
//         return { props: {
//             data
//         } };
//     }catch(err){
//         return { props: {
//             data:err.response.data
//         } };
//     }

  
//   };
function Header() {
    const [click, setClick] = useState(false);
    const [Data, setData] = useState();
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    useEffect(() => {
        gettoken()
      }, []);
    console.log(Data)
    function gettoken(){
        requesttoken().then(res => {
            setData(res.data)
          }).catch(err => {
            console.log(err.response.data)
          })
    }
    return (
        <div className='Header-con'>
        <div className="Header">
            {Data
                ?(<>
                 <div className="logo-container">
                <Link href="/">ToDoList</Link>
            </div>
            <div className="header-con">
                <ul className={click ? "menu active" : " menu"}>
                     
                    <li className="menu-link" onClick={closeMobileMenu}>
                        <button href="/Login">Logout</button>
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
                </>)
                :(<>
                 <div className="logo-container">
                <Link href="/">ToDoList</Link>
            </div>
            <div className="header-con">
                <ul className={click ? "menu active" : " menu"}>
                     <li className="menu-link" onClick={closeMobileMenu}>
                        <Link href="/admin/Admindashboard">Dashboard</Link>
                    </li>
                    <li className="menu-link" onClick={closeMobileMenu}>
                        <Link href="/Register">Register</Link>
                    </li>
                    <li className="menu-link" onClick={closeMobileMenu}>
                        <Link href="/Login">Login</Link>
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
                </>)
            }
           
        </div>
        </div>

    )
}

export default Header