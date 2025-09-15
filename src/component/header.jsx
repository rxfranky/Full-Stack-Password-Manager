import { NavLink } from "react-router"
import isLoggedIn from "../util/isLoggedIn"
import { useState } from "react"

import { ToastContainer, toast } from "react-toastify"

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn())
    const [resData, setResData] = useState()

    async function deleteToken() {

        const response = await fetch('http://localhost:3000/logout', {
            headers: {
                'email': localStorage.getItem('email'),
                'token': localStorage.getItem('token')
            }
        })
        if (!response.ok) {
            return console.log('res is not ok!')
        }
        const data = await response.json()

        if (data.tokenErr || data.invalidToken) {
            setResData(data)
        }

        if (data.logoutSuccess) {
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        }

        setLoggedIn(false)
    }

    if (resData) {
        toast(resData.message)
    }

    return (
        <>
            <nav className="h-14 bg-gray-800 flex justify-around items-center text-white">
                <NavLink to={'/'}>
                    <div className="text-lg cursor-pointer">
                        <span className="font-bold text-green-600">&lt;</span><span className="font-bold">Pass</span><span className="font-bold text-green-600">OP/&gt;</span>
                    </div>
                </NavLink>

                <div className="font-semibold">
                    {localStorage.getItem('email') && <span className="p-1 pl-2 pr-2 text-white mr-5 bg-black rounded-md">{localStorage.getItem('email')}</span>}

                    <NavLink to={'/signup'}><span className="mr-5 cursor-pointer">Signup</span></NavLink>
                    {!loggedIn && <NavLink to={'/login'}><span>Login</span></NavLink>}
                    {loggedIn && <button className="cursor-pointer" onClick={deleteToken}>Logout</button>}
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}