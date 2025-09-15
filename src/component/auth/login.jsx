import Header from "../header"
import Footer from "../footer"
import Modal from "../modal"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"

export default function Login() {
    const [responseData, setResponseData] = useState([])
    const [responseData_2, setResponseData_2] = useState('')
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (responseData_2) {
            setShowModal(true)
        }
    }, [responseData_2])

    if (showModal) {
        setTimeout(() => {
            setShowModal(false)
            navigate('/')
        }, 2000)
    }
    const token = localStorage.getItem('token')
    async function handleSubmit(formdata) {
        const formData = Object.fromEntries(formdata)

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const responseData = await response.json()

        if (responseData.emailValidationError || responseData.passwordValidationError) {
            setResponseData(responseData.emailValidationError ?? responseData.passwordValidationError)
        }
        if (responseData.msg) {
            setResponseData_2(responseData.msg)
            localStorage.setItem('token', responseData.token)
            localStorage.setItem('email', responseData.email)
        }
        if (responseData.isLoggedIn) {
            setResponseData_2(responseData.isLoggedIn)
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
                navigate('/')
            }, 2000)
        }
    }

    return (
        <>
            <Header />
            <div className="parent flex justify-center mt-9">
                <form action={handleSubmit}>
                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="email">Email</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter email" id="email" name="email"></input>
                    </div>
                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="password">Password</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter password" id="password" name="password"></input>
                    </div>
                    <div className="submit-reset-button flex justify-end gap-3 items-center">
                        <Link className="" to={"/resetPassword"}>Reset Password</Link>
                        <button className="mr-5 cursor-pointer p-2 pl-6 pr-6 bg-green-600 text-black rounded-full outline outline-black">Submit</button>
                    </div>
                </form>
            </div>
            <Modal open_2={showModal}>
                {responseData_2}
                <p>redirecting to homepage...</p>
            </Modal>
            <div className="show-error mt-7 flex justify-center">
                <ul>
                    {responseData.map(error => <li className="p-1 rounded-sm pl-3 w-[50vw] bg-red-300 mb-2" key={error.msg}>{error.msg}</li>)}
                </ul>
            </div>
            <Footer />
        </>
    )
}