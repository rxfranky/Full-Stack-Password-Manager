import copyIcon from '../../assets/icons/copy.png'

export default function TableData({ text }) {
    function handleClick() {
        navigator.clipboard.writeText(text)
    }
    return (
        <td className="outline-1 outline-white pt-2 pb-2">
            <div className='flex gap-3 justify-center'>
                <span>{text}</span> <img className='cursor-pointer' onClick={handleClick} src={copyIcon} width={20} alt="" />
            </div>
        </td>
    )
}