import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import ResourceListings from '../components/ResourceListings'
import ViewAllResources from '../components/ViewAllResources'

const HomePage = () => {
  return (
    <>
        <Hero/>
        <HomeCards />
        <ResourceListings isHome={true} />
        <ViewAllResources/>
    </>
  )
}

export default HomePage
