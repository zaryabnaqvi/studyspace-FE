import { Link } from "react-router-dom"

const Hero = ({ subtitle = 'Explore the best resources and tools to level up your skills. Add a resource to share the wealth.' }) => {
    return (
        <>
            {/* <!-- Hero --> */}
            <section className="bg-red-500 py-20 mb-4  lg:px-32 xl:px-96">
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
                >
                    <div className="text-center">
                        <h1
                            className="text-4xl font-extrabold text-white sm:text-5xl md:text-7xl animate-fade animate-duration-2000"
                        >
                            Your Coding Education Lives {" "}
                            <span className="relative inline-block animate-jump animate-once animate-delay-1000 animate-ease-out animate-duration-[1500ms]">
                                <span className="relative z-10 text-red-200">Here</span>
                                <span
                                    className="absolute inset-x-0 bg-no-repeat bg-contain h-32 w-32 bottom-[-90px] left-[-22px] md:w-72 md:h-72 md:bottom-[-12.5rem] md:left-[-3.75rem] lg:left-[-56px]"
                                    style={{
                                        backgroundImage: "url('brush.png')"
                                    }}
                                ></span>
                            </span>
                        </h1>
                        <p className="mt-20 mb-4 text-xl text-white px-6 sm:px-16 animate-fade animate-duration-2000">
                            {subtitle}
                        </p>

                        <button className="mt-8 bg-red-50 py-4 px-6 font-bold rounded-2xl text-xl hover:bg-black hover:text-white transition duration-500">
                            <Link to='/login'>
                            Get Started
                            </Link>
                            
                            </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
