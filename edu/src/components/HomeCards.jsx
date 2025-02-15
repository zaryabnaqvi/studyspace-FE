import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from './Card'

const HomeCards = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    const handleAddResourceClick = (e) => {
        if (!user) {
            e.preventDefault()
            navigate('/login')
        }
    }

    return (

        <section className="py-4 bg-red-50">
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

                    <Card data-aos='fade-down' data-aos-duration="1000" data-aos-once="true" bg='bg-red-200'>

                        <h2 className="text-2xl font-bold text-black ">Discover & Learn</h2>
                        <p className="mt-2 mb-4 text-black">
                            Find the perfect coding resources to build your existing skills, master new ones, and shape your future
                        </p>
                        <Link
                            to="/resources"
                            className="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-400 transition duration-300"
                        >
                            Browse Resources
                        </Link>
                    </Card>

                    <Card data-aos='fade-up' data-aos-duration="1000" data-aos-delay="1000" data-aos-once="true" bg='bg-red-100'>
                        <h2 className="text-2xl font-bold text-black">Share & Contribute</h2>
                        <p className="mt-2 mb-4 text-black">
                            Share your educational resources and help learners discover valuable tools for their growth
                        </p>
                        <Link
                            to={user ? "/add-resources" : "/login"}
                            onClick={handleAddResourceClick}
                            className="inline-block bg-red-400 text-white rounded-lg px-4 py-2 hover:bg-red-500 transition duration-300"
                        >
                            Add Resources
                        </Link>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default HomeCards
