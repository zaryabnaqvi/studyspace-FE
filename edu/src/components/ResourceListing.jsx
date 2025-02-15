import { useState } from 'react'
import { SiLevelsdotfyi } from "react-icons/si"
import { Link } from 'react-router-dom'

const ResourceListing = ({ resources }) => {

    const [showFullDescription, setShowFullDescription] = useState(false)
    let description = resources.description

    if (!showFullDescription) {
        description = description.substring(0, 90) + '...'
    }


    return (

        <div className="bg-white rounded-xl shadow-md relative text-black hover:shadow-2xl transition duration-500" data-aos="fade" data-aos-duration="700" data-aos-once="true">
            <div className="absolute top-4 right-4 flex items-center">
                {resources.user && (
                    <div className="relative group">
                        <img
                            src={resources.user.avatar}
                            alt={`${resources.user.displayName}'s Profile`}
                            className="w-11 h-11 rounded-full border-2 border-white shadow-md"
                        />
                        {/* Tooltip that appears on hover */}
                        <div className="absolute -bottom-8 right-0 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {resources.user.displayName}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="mb-6">
                    <h3 className="text-xl font-bold mr-10">{resources.title}</h3>
                    <div className="text-gray-600 my-2">{resources.type}</div>
                </div>

                <div className="mb-5">
                    {description}
                </div>

                <button onClick={() => setShowFullDescription((prevState) => !prevState)} className="text-red-500 mb-5 hover:text-red-400 transition duration-200 text-xs">{showFullDescription ? 'See Less' : 'See More'}</button>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-red-500 font-bold">
                        Made by <span className='font-normal'>{resources.createdBy}</span>
                    </h3>
                    <div className="text-red-700 flex items-center">
                        <SiLevelsdotfyi className='text-lg mr-1' />
                        {resources.level}
                    </div>
                </div>



                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <Link
                        to={`/resource/${resources._id}`}
                        className="h-[36px] w-full bg-red-500 hover:bg-red-400 transition duration-300 text-white px-4 py-2 rounded-lg text-center text-sm mt-3"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResourceListing
