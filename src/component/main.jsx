import editIcon from '../assets/icons/editing.png'
import deleteIcon from '../assets/icons/delete.png'
import eyeIcon from '../assets/icons/eye.png'
import crossEye from '../assets/icons/cross-eye.png'
import TableData from './sub-component/table-data'

import { useState, useEffect, useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import isLoggedIn from '../util/isLoggedIn'


export default function Main() {
    const [eyeSrc, setEyeSrc] = useState(eyeIcon);
    const [toggleShowPass, setToggleShowPass] = useState('password');
    const [resDatas, setResDatas] = useState({})
    const [data, setData] = useState({})

    const websiteUrlInp = useRef()
    const usernameInp = useRef()
    const passwordInp = useRef()
    const idInp = useRef()

    function handleEyeSrc() {
        setEyeSrc((val) => {
            if (val === eyeIcon) {
                return crossEye;
            } else if (val === crossEye) {
                return eyeIcon;
            }
        })

        setToggleShowPass((val) => {
            if (val === 'password') {
                return 'text';
            } else if (val === 'text') {
                return 'password'
            }
        })
    }

    async function handleSubmit(formData) {
        const formDataObj = Object.fromEntries(formData);

        const response = await fetch('http://localhost:3000/postData', {
            method: 'post',
            body: JSON.stringify(formDataObj),
            headers: {
                'Content-Type': 'Application/json',
                'loggedInUser': localStorage.getItem('email'),
                'authorization': localStorage.getItem('token')
            }
        })
        if (!response.ok) {
            console.log('res is not ok!')
        }
        const responseData = await response.json();
        setResDatas(responseData)

    }

    useEffect(() => {
        if (resDatas.Err) {
            resDatas.validationErrors.map((val) => { return toast(val.msg) })
        }
        if (resDatas.success) {
            toast(resDatas.message)
        }
        if (resDatas.tokenErr) {
            toast(resDatas.message)
        }
        if (resDatas.invalidToken) {
            toast(resDatas.message)
        }
        if (resDatas.deleted) {
            toast(resDatas.message)
        }
        if (resDatas.edited) {
            toast('Data edited success!')
        }
    }, [resDatas])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/getData', {
                headers: {
                    'token': localStorage.getItem('token'),
                    'email': localStorage.getItem('email')
                }
            })
            if (!response.ok) {
                return console.log('res is not ok!')
            }
            const data = await response.json()
            setData(data)
        }
        fetchData()
    }, [])

    let classes = "table m-auto mt-20";
    if (!isLoggedIn() || (data.fetchedDatas && data.fetchedDatas.length == 0)) {
        classes = 'mt-20 text-center'
    }

    async function handleDeleteClick(val) {
        const response = await fetch('http://localhost:3000/deleteData', {
            method: 'delete',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ val })
        })
        if (!response.ok) {
            return console.log('res is not ok!')
        }
        const data = await response.json()
        setResDatas(data)
    }

    function handleEditClick(websiteUrl, username, password, id) {
        websiteUrlInp.current.value = websiteUrl;
        usernameInp.current.value = username;
        passwordInp.current.value = password;
        idInp.current.value = id;
    }

    console.log('dada')
    return (
        <>
            <div className="parent flex items-center gap-7 flex-col mt-9">
                <div className='flex flex-col items-center'>
                    <div className="text-3xl">
                        <span className="font-bold text-green-600">&lt;</span><span className="font-bold">Pass</span><span className="font-bold text-green-600">OP/&gt;</span>
                    </div>
                    <span className='flex gap-1 text-black font-semibold'>Your own Password Manager</span>
                </div>
                <form action={handleSubmit} className='flex flex-col items-center gap-7'>
                    <div className="inputs">
                        <p><input ref={websiteUrlInp} className="focus:outline-1 focus:outline-green-600  pl-3 rounded-full mb-5 w-[70vw] border-[1.5px] border-green-600" type="text" placeholder="enter website URL" name='websiteUrl' /></p>

                        <input ref={usernameInp} className="focus:outline-1 focus:outline-green-600 pl-3 rounded-full w-[54vw] mr-3.5 border-[1.5px] border-green-600" type="text" placeholder="enter username" name='username' />

                        <img className='absolute right-56 top-58 cursor-pointer' onClick={handleEyeSrc} src={eyeSrc} width={16} alt="" />

                        <input ref={passwordInp} className="focus:outline-1 focus:outline-green-600 pl-3 rounded-full w-[15vw] border-[1.5px] border-green-600" type={toggleShowPass} placeholder="enter password" name='password'></input>

                        <input ref={idInp} type="hidden" name='id' />
                    </div>

                    <button className="p-3 pl-6 pr-6 cursor-pointer w-fit bg-green-600 text-black rounded-full outline outline-black">Add Password</button>
                </form>
            </div>

            <div className={classes}>
                <p className="m-3 text-black font-bold text-xl">Your Passwords</p>
                {data.tokenErr && <p className='m-3'>{data.message} To Show your Passwords</p>}
                {data.invalidToken && <p className='m-3'>{data.message}</p>}
                {data.fetchedDatas && data.fetchedDatas.length == 0 && <p className='m-3'>You have&apos;nt added data yet!</p>}
                {data.fetchedDatas && data.fetchedDatas.length > 0 &&
                    <table className="table-auto w-[70vw]">
                        <thead>
                            <tr className="bg-green-700 text-white font-bold">
                                <th className="rounded-tl-md p-2 pl-7 pr-7 ">Website</th>
                                <th className="p-2 pl-7 pr-7 ">Username</th>
                                <th className="p-2 pl-7 pr-7 ">Password</th>
                                <th className="rounded-tr-md p-2 pl-7 pr-7 ">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-100">
                            {data.fetchedDatas.map((val) => {
                                return (
                                    <tr key={val.websiteUrl}>
                                        <TableData text={val.websiteUrl} />
                                        <TableData text={val.username} />
                                        <TableData text={val.password} />

                                        <td className="outline-1 outline-white pt-2 pb-2">
                                            <div className='flex gap-3 justify-center'>
                                                <span>
                                                    <img className='cursor-pointer' onClick={() => handleEditClick(val.websiteUrl, val.username, val.password, val._id.toString())} src={editIcon} width={20} alt="" />
                                                </span>

                                                <img className='cursor-pointer' onClick={() => handleDeleteClick(val._id.toString())} src={deleteIcon} width={20} alt="" />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
            <ToastContainer />
        </>
    )
}