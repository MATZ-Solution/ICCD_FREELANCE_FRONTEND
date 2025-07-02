
const NewBanner = ({ children, imageURL }) => {
    return (
        <div className='px-3 sm:px-10 mt-10'>
            <section className=" flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 md:p-12 rounded-2xl shadow-lg">
                {/* Left Text Content */}
                {children}
                {/* Right Image */}
                {imageURL && (
                    <div className="w-full sm:w-1/2">
                        <img
                            src={imageURL}
                            alt="Banner Illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                )
                }
            </section>
        </div>
    );
};

export default NewBanner;
