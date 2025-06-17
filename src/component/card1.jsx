import EastIcon from '@mui/icons-material/East';


function Card1({ text1, text2, bgColor }) {
    return (
        <div className={`w-full px-10 py-5 ${bgColor} rounded-xl`}>
            <h1 className=' text-white text-2xl font-semibold'>{text1}</h1>
            <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                <p className='text-white'> {text2} </p>
                <EastIcon className=' text-white'/>
            </div>
        </div>
    )
}

export default Card1