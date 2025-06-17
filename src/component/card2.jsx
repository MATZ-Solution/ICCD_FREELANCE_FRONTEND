import EastIcon from '@mui/icons-material/East';


function Card2({ text1, text2, bgColor }) {
    return (
        <div className={`w-full px-5 py-5 ${bgColor} rounded-xl`}>
            <h1 className=' text-black text-2xl font-semibold'>{text1}</h1>
            <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                <p className='text-black'> {text2} </p>
                <EastIcon className=' text-black'/>
            </div>
        </div>
    )
}

export default Card2