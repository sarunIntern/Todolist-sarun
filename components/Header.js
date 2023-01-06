import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { requesttoken, logout } from '../function/Auth/Auth';
import { FiMenu, FiX } from "react-icons/fi";
import Toast from '../Alert/Success';
// import Cookies from 'js-cookie'
function Header() {
    const [click, setClick] = useState(false);
    const [Data, setData] = useState({});
    const [Token, setToken] = useState({});
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const router = useRouter()

    useEffect(() => {
        gettoken()
    }, [Token]);
    console.log(Data)
    
    function gettoken() {
        requesttoken().then(res => {
            if (res.data !== null) {
                setData(res.data.Decode)
                setToken(res.data.token)
                localStorage.setItem("user_id",res.data.Decode.user_id);
            } else {
                setData(null)
                setToken(null)
            }
        }).catch(err => {
            console.log(err.response.data)
        })
        // const jwt = Cookies.get('jwt_token')
        // setData(jwt)
    }
    function logouts() {
        logout().then(res => {
            Toast.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data
            })
            localStorage.clear()    
            setToken(null)
            router.replace('/Login')
            // router.refresh()
        }).catch(err => {
            console.log(err.response)
        })
    }
    return (
        <div className='Header-con'>
            <div className="Header">
                {Token !== null
                    ? (<>
                        {Data.role === 'a'
                            ? (<>
                                <div className="logo-container">
                                    <Link href="/">ToDoList</Link>
                                </div>
                                <div className="header-con">
                                    <ul className={click ? "menu active" : " menu"}>
                                        <li className="menu-link" onClick={closeMobileMenu}>
                                            <Link href="/admin/Admindashboard">Admindashboard</Link>
                                        </li>
                                        <li className="menu-link" onClick={closeMobileMenu}>
                                            <Link href="/" onClick={logouts}>Logout</Link>
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
                            : (<>
                                <div className="logo-container">
                                    <Link href="/">ToDoList</Link>
                                </div>
                                <div className="header-con">
                                    <ul className={click ? "menu active" : " menu"}>
                                        <li className="menu-link" onClick={closeMobileMenu}>
                                            <Link href="/user" >Dashboard</Link>
                                        </li>
                                        <li className="menu-link" onClick={closeMobileMenu}>
                                            <Link href="/" onClick={logouts}>Logout</Link>
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

                    </>)
                    : (<>
                        <div className="logo-container">
                            <Link href="/">ToDoList</Link>
                        </div>
                        <div className="header-con">
                            <ul className={click ? "menu active" : " menu"}>
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

// export async function getServerSideProps() {
 
//     const result = await requesttokens()
//     // const res = await fetch('https://final-ccna-backend.vercel.app/Category/category');
//     const posts = await result.data
  
//     return {
//       props: {
//         posts
//       },
//     }
//   }

export default Header