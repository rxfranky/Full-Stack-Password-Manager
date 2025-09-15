import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"

export default function Modal({ open_2, children }) {
    const dialog = useRef()

    useEffect(() => {
        if (open_2) {
            dialog.current.showModal()
        } else {
            dialog.current.close()
        }
    }, [open_2])

    return (
        createPortal(
            <dialog className="p-52 m-auto rounded-lg shadow-xl bg-white border-2" ref={dialog}>{children}</dialog>,
            document.getElementById('modal')
        )
    )
}