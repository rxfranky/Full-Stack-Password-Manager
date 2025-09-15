import Header from "../header"
import Footer from "../footer"
import { useState } from "react"

export default function ResetPassword() {
    const [validationErrMsg, setValidationErrMsg] = useState()
    const [successMsg, setSuccessmsg] = useState()

    async function handleSubmitt(formData) {
        const formDataObj = Object.fromEntries(formData)

        const response = await fetch('http://localhost:3000/resetPassword', {
            body: JSON.stringify(formDataObj),
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            console.log('res is not ok!')
        }
        const data = await response.json();

        if (data.validationError) {
            setValidationErrMsg(data.validationError)
        }

        if(data.message) {
            setSuccessmsg(data.message)
        }

    }

    return <>
        <Header />
        <div className="parent flex justify-center mt-9">
            <form action={handleSubmitt}>
                <div className="input-element flex flex-col mb-3">
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter email" id="email" name="email"></input>
                </div>
                <button className="ml-[40vw] cursor-pointer p-2 pl-6 pr-6 bg-green-600 text-black rounded-full outline outline-black">Send Email</button>
            </form>
        </div>
        {validationErrMsg && (<div className="show-error mt-7 flex justify-center">
            <ul>
                <li className="p-1 rounded-sm pl-3 w-[50vw] bg-red-300 mb-2">{validationErrMsg}</li>
            </ul>
        </div>)}
        {successMsg && (<div className="show-error mt-7 flex justify-center">
            <ul>
                <li className="p-1 rounded-sm pl-3 w-[50vw] bg-green-300 mb-2">
                    {successMsg}
                    <a className="underline text-blue-800" href="https://mail.google.com/mail">link</a>
                </li>
            </ul>
        </div>)}
        <Footer />
    </>
}