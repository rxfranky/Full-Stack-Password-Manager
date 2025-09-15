import { useParams } from "react-router";
import Header from "../header";
import Footer from "../footer";
import { useState } from "react";

export default function NewPassPage() {
    const [validationErr, setValidationErr] = useState([])
    const [resetSuccessMsg, setResetSuccessMsg] = useState()

    const { token } = useParams();

    async function handleSubmit(formData) {
        const formDataObj = Object.fromEntries(formData);

        const response = await fetch('http://localhost:3000/verifyToken&resetPass', {
            method: 'Post',
            body: JSON.stringify(formDataObj),
            headers: {
                'Content-Type': 'Application/json',
                'resetToken': token
            }
        })
        if (!response.ok) {
            return console.log('err in res.ok')
        }

        const data = await response.json()

        if (data.validationErr) {
            setValidationErr(data.validationErr)
        }

        if (data.message) {
            setResetSuccessMsg(data.message)
        }

    }

    return (
        <>
            <Header />
            <div className="parent flex justify-center mt-9">
                <form action={handleSubmit}>
                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="newPass">New Password</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter new password" id="newPass" name="newPass"></input>
                    </div>

                    <div className="input-element flex flex-col mb-3">
                        <label className="font-semibold" htmlFor="newConfirmPass">New Confirm Password</label>
                        <input className="focus:outline-1 focus:outline-green-600 pl-3 rounded-sm w-[50vw] border-[1.5px] border-green-600" type="text" placeholder="enter new confirm password" id="newConfirmPass" name="newConfirmPass"></input>
                    </div>
                    <button className="ml-[40vw] cursor-pointer p-2 pl-6 pr-6 bg-green-600 text-black rounded-full outline outline-black">Submit</button>
                </form>
            </div>
            <div className="show-error mt-7 flex justify-center">
                <ul>
                    {validationErr.map(error => <li className="p-1 rounded-sm pl-3 w-[50vw] bg-red-300 mb-2" key={error.msg}>{error.msg}</li>)}
                </ul>
            </div>
            {resetSuccessMsg && (<div className="show-error mt-7 flex justify-center">
                <ul>
                    <li className="p-1 rounded-sm pl-3 w-[50vw] bg-green-300 mb-2" >{resetSuccessMsg}
                        <a className="underline text-blue-800" href="/login">link</a>
                    </li>
                </ul>
            </div>)}
            <Footer />
        </>
    )
}