import { Link } from 'react-router-dom'

const ViewAllResources = () => {
  return (
    <section className="bg-red-50 m-auto max-w-lg py-10 px-6 ">
        <Link
          to="/resources"
          className="block bg-red-800 text-white text-center py-4 px-6 rounded-xl hover:bg-red-700 transition duration-300 font-bold"
        >View All Resources
        </Link>
      </section>
  )
}

export default ViewAllResources