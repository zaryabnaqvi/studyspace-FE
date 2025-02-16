import { useParams, useLoaderData, Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { SiLevelsdotfyi } from "react-icons/si"
import { MdModeEdit } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai" 
import { HiOutlineTemplate  } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from '../context/AuthContext'

const VITE_API_URL = import.meta.env.VITE_API_URL

// ! ********************************************* !
// ! ******* DELETE RESOURCE *******
// ! ********************************************* !
const ResourcePage = ({ deleteResource }) => {

    const { user } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const resource = useLoaderData()
    const isOwner = user && resource.user && user._id === resource.user._id




    const onDeleteClick = async (resourceId) => {


        const confirm = window.confirm('Are you sure you want to delete this resource?')

        if (!confirm) return

        try {
            await deleteResource(resourceId)
            toast.success('Resource deleted successfully!')
            navigate(-1)
        } catch (error) {
            toast.error('Failed to delete resource')
            console.error('Error deleting resource:', error)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section - Made responsive */}
            <div className="bg-white border-b">
                <div className="container mx-auto py-4 px-4 sm:px-6">
                    <Link to="/resources">
                        <button className="btn bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition duration-300 flex items-center text-sm sm:text-base">
                            <FaArrowLeft className="mr-2" /> Back to Resources
                        </button>
                    </Link>
                </div>
            </div>

            {/* Main Content - Improved mobile padding */}
            <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Resource Header - Adjusted padding and layout */}
                    <div className="relative border-b">
                        <div className="p-4 sm:p-8">
                            {/* Management Controls - Repositioned for mobile */}
                            {isOwner && (
                                <div className="flex items-center gap-2 mb-4 sm:mb-0 sm:absolute sm:top-8 sm:right-8 sm:gap-4">
                                    <Link to={`/edit-resource/${resource._id}`}
                                        className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
                                        <MdModeEdit className="text-xl sm:text-2xl text-gray-600 hover:text-amber-500" />
                                    </Link>
                                    <button 
                                        onClick={() => onDeleteClick(resource._id)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
                                        <AiFillDelete className="text-xl sm:text-2xl text-gray-600 hover:text-red-500" />
                                    </button>
                                </div>
                            )}

                            {/* Title and Type - Made responsive */}
                            <div className="max-w-3xl">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                                    <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                        <HiOutlineTemplate className="inline mr-1"/>
                                        {resource.type}
                                    </span>
                                    <div className="flex items-center text-orange-700 text-sm px-2 sm:px-3 py-1 bg-orange-100 rounded-full">
                                        <SiLevelsdotfyi className="mr-1" />
                                        {resource.level}
                                    </div>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                    {resource.title}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid - Made responsive */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-8">
                        {/* Main Content Column */}
                        <div className="md:col-span-2 space-y-6 sm:space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                                    Description
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {resource.description}
                                </p>
                            </div>

                            <div>
                                {/* download resources button*/}
                                <a 
  href={resource.contentUrl} 
  target="_blank" 
  rel="noopener noreferrer" 
  download="resource-file.pdf" 
  className="btn btn-primary"
>
  Download
</a>

                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Made By
                                </h3>
                                <p className="text-gray-600">{resource.createdBy}</p>
                            </div>
                        </div>

                        {/* Sidebar Information - Improved mobile layout */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                                Resource Details
                            </h3>
                            
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <div className="flex items-center text-gray-900 mb-2">
                                        <h4 className="font-medium">Category</h4>
                                    </div>
                                    <p className="text-gray-600">{resource?.info?.category}</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Link</h4>
                                    <Link 
                                        to={resource?.info?.link} 
                                        target="_blank" 
                                        className="text-red-500 hover:text-red-600 break-words transition duration-200"
                                    >
                                        {resource?.info?.link}
                                    </Link>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Published</h4>
                                    <span className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium">
                                        {resource?.info?.published}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const resourceLoader = async ({ params }) => {
    try {
        const res = await fetch(`${VITE_API_URL}/resource/getById/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }  // Auth cookies
            
        }) // Auth cookies
        if (!res.ok) {
            throw new Error('Failed to fetch resource')
        }
        const data = await res.json()
        return data.data
    } catch (error) {
        console.error('Error loading resource:', error)
        throw error
    }
}


export { ResourcePage as default, resourceLoader }