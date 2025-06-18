import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import cardImage from '../assets/card_img_1.jpg'
const Banner7 = () => {
    const data = [
        {
            col_1:
                [
                    { name: "Logo Design" },
                    { name: "Logo Design" },
                    { name: "Logo Design" },
                    { name: "Logo Design" },
                    { name: "Logo Design" },
                    { name: "Logo Design" }
                ]
        }
    ]
    return (
        <div className='px-3 sm:px-10 mt-10'>
            <section className="flex flex-col p-4 items-center justify-between  rounded-2xl  md:flex-row">
                <div className="w-full  text-center md:text-left mb-6 md:mb-0">
                    <h1 className="text-center text-3xl font-semibold text-black mb-4  md:text-5xl ">
                        Latest Work on  <span className='text-[#15A9B2]'>ICCD Freelance</span>
                    </h1>

                    <div className='mt-10 w-full grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 '>

                        {/* column 1 */}
                        <div className='w-full flex flex-col gap-7 '>
                            {
                                data[0].col_1.map((item, index) => {
                                    const value = index + 1
                                    return (
                                        <div key={value} className={` rounded-xl`}>
                                            <div className={`relative ${value % 3 === 0 ? 'h-72' : 'h-28'} `}>
                                                <div className='absolute top-3 right-3 rounded-full p-2 bg-white'>
                                                    <FavoriteBorderOutlinedIcon />
                                                </div>
                                                <img className='object-cover h-full w-full rounded-xl' src={cardImage}></img>
                                            </div>
                                            <div className='bg-white flex items-center justify-between mt-3'>
                                                <p className='font-semibold'>Illustration</p>
                                                <MoreHorizIcon />
                                            </div>
                                        </div>

                                    )
                                })
                            }

                        </div>

                        {/* column 2 */}
                        <div className='flex flex-col gap-4'>
                            {
                                data[0].col_1.map((item, index) => {
                                    const value = index + 1
                                    return (
                                        <div key={value} className={` rounded-xl`}>
                                            <div className={`relative ${value % 2 === 0 ? 'h-28' : 'h-72'} }`}>
                                                <div className='absolute top-3 right-3 rounded-full p-2 bg-white'>
                                                    <FavoriteBorderOutlinedIcon />
                                                </div>
                                                <img className='object-cover h-full w-full rounded-xl' src={cardImage}></img>
                                            </div>
                                            <div className='bg-white flex items-center justify-between mt-3'>
                                                <p className='font-semibold'>Illustration</p>
                                                <MoreHorizIcon />
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>

                        {/* column 3 */}
                        <div className='flex flex-col gap-4'>
                            {
                                data[0].col_1.map((item, index) => {
                                    const value = index + 1
                                    return (
                                        <div key={value} className={` rounded-xl`}>
                                            <div className={`relative ${value % 2 === 0 ? 'h-72' : 'h-28'} `}>
                                                <div className='absolute top-3 right-3 rounded-full p-2 bg-white'>
                                                    <FavoriteBorderOutlinedIcon />
                                                </div>
                                                <img className='object-cover h-full w-full rounded-xl' src={cardImage}></img>
                                            </div>
                                            <div className='bg-white flex items-center justify-between mt-3'>
                                                <p className='font-semibold'>Illustration</p>
                                                <MoreHorizIcon />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* column 4 */}
                        <div className='flex flex-col gap-4'>
                            {
                                data[0].col_1.map((item, index) => {
                                    const value = index + 1
                                    return (
                                        <div key={value} className={` rounded-xl`}>
                                            <div className={`relative ${value % 3 === 0 ? 'h-28' : 'h-72'} `}>
                                                  <div className='absolute top-3 right-3 rounded-full p-2 bg-white'>
                                                    <FavoriteBorderOutlinedIcon />
                                                </div>
                                                <img className='object-cover h-full w-full rounded-xl' src={cardImage}></img>
                                            </div>
                                            <div className='bg-white flex items-center justify-between mt-3'>
                                                <p className='font-semibold'>Illustration</p>
                                                <MoreHorizIcon />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
};

export default Banner7;
