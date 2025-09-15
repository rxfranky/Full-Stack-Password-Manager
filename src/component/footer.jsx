import heart from '../assets/icons/heart.png'

export default function Footer() {
    return (
        <footer className="h-14 bg-gray-800 text-white w-full fixed bottom-0 flex justify-center items-center">
            <div className='flex flex-col items-center'>
                <div>
                    <span className="font-bold text-green-600">&lt;</span><span className="font-bold">Pass</span><span className="font-bold text-green-600">OP/&gt;</span>
                </div>
                <span className='flex gap-1'>Made with <img width={19} src={heart} alt="" /> by Talha</span>
            </div>
        </footer>
    )
}