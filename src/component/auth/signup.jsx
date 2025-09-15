import { useNavigate } from "react-router"
import Footer from "../footer"
import Header from "../header"
import { useState, useEffect } from "react"
import Modal from "../modal"

export default function Signup() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [resMessage, setResMessage] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        if (resMessage) {
            setShowModal(true)
        }
    }, [resMessage])

    if (showModal) {
        setTimeout(() => {
            setShowModal(false)
            navigate('/login')
        }, 2000);
    }

    async function handleSubmit(formdata) {
        const data = Object.fromEntries(formdata)

        const res = await fetch('http://localhost:3000/signup', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await res.json()

        if (responseData.msg) {
            setResMessage(responseData.msg)
        }
        if (responseData.validationErrors) {
            setValidationErrors(responseData.validationErrors)
        }
    }

    return (
        <>
            <Header />
            <div className="parent flex justify-center mt-9">
                <form action={handleSubmit}>
                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="name">Name</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter name" id="name" name="name"></input>
                    </div>
                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="email">Email</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter email" id="email" name="email"></input>
                    </div>
                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="password">Password</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter password" id="password" name="password"></input>
                    </div>
                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="confirmPass">Confirm Password</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter confirm password" id="confirmPass" name="confirmPass"></input>
                    </div>
                    <button className="relative left-150 cursor-pointer p-2 pl-6 pr-6 bg-green-600 text-black rounded-full outline outline-black">Submit</button>
                </form>
            </div>
            <Modal open_2={showModal}>
                {resMessage}
                <p>redirecting to login...</p>
            </Modal>
            <div className="show-error mt-7 flex justify-center">
                <ul>
                    {validationErrors.map(error => <li className="p-1 rounded-sm pl-3 w-[50vw] bg-red-300 mb-2" key={error.msg}>{error.msg}</li>)}
                </ul>
            </div>
            <Footer />
        </>
    )
}