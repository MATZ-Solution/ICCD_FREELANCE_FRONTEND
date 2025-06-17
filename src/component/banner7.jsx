import EastIcon from '@mui/icons-material/East';

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
                        <div className='w-full flex flex-col gap-4 '>
                            {
                                data[0].col_1.map((item, index) => {
                                    const value = index + 1
                                    return (
                                        <div key={value} className={` ${value % 3 === 0 && 'h-72'} px-5 py-5 bg-gray-300 rounded-xl`}>
                                            <h1 className='text-lg text-black sm: font-semibold'>{item.name}</h1>
                                            <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                                                <p className='text-black'> text 2 </p>
                                                <EastIcon className=' text-black' />
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
                                        <div key={index} className={`w-full ${value % 2 === 0 ? 'h-28' : 'h-72'} px-5 py-5 bg-gray-300 rounded-xl`}>
                                            <h1 className='text-lg text-black sm:text-2xl font-semibold'>{item.name}</h1>
                                            <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                                                <p className='text-black'> text 2 </p>
                                                <EastIcon className=' text-black' />
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
                                        <div key={index} className={`w-full ${value % 2 === 0 ? 'h-72' : 'h-28'} px-5 py-5 bg-gray-300 rounded-xl`}>
                                            <h1 className='text-lg text-black sm:text-2xl font-semibold'>{item.name}</h1>
                                            <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                                                <p className='text-black'> text 2 </p>
                                                <EastIcon className=' text-black' />
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
                                        <div key={index} className={`w-full ${value % 3 === 0 ? 'h-28' : 'h-72'} px-5 py-5 bg-gray-300 rounded-xl`}>
                                            <h1 className='text-lg text-black sm:text-2xl font-semibold'>{item.name}</h1>
                                            <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                                                <p className='text-black'> text 2 </p>
                                                <EastIcon className=' text-black' />
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
