import EastIcon from '@mui/icons-material/East';
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'

const Banner4 = () => {
    const topic = [
        { name: "Access a pool of top talent across 700 categories", icon: icon1 },
        { name: "Enjoy a simple, easy-to-use matching experience", icon: icon2 },
        { name: "Get quality work done quickly and within budget", icon: icon3 },
        { name: "Only pay when you’re happy", icon: icon4 }
    ]
    return (
        <div className='px-3 sm:px-10 mt-10'>
            <section
                // style={{ backgroundImage: `url(${bannerImage})` }}
                className=" bg-cover bg-no-repeat flex flex-col md:flex-row items-center justify-between p-4 md:p-12 rounded-2xl ">
                <div className="w-full text-center  mb-6 md:mb-0">
                    <h1 className="text-3xl text-black mb-4 md:text-5xl  md:font-semibold ">
                        Make it all happen with <span className='text-[#01AEAD]'>freelancers</span>
                    </h1>

                    <div className='mt-10 p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        {topic.map((item, index) => (
                            <div key={index} className={`flex flex-col gap-8 items-center justify-center px-7 ${index !== 3 && 'lg:border-r-[#15A9B2] lg:border-r-2 '}`}>
                                <img src={item.icon}></img>
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className='mt-10 flex items-center justify-center'>
                        <button onClick={() => navigate('/login')} className="shadow-xl/20 flex items-center justigy-center gap-5 ml-4 px-4 py-3 bg-[#043A53] text-white rounded-full hover:bg-[#05929c] transition cursor-pointer font-semibold hidden md:flex">
                            <p>Get Started Now</p>
                            <EastIcon />
                        </button>
                    </div>

                </div>

                {/* Right Image */}
            </section>
        </div>
    );
};

export default Banner4;
