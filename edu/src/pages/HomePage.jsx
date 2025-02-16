import ChatBot from "../components/ChatBot";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import ResourceListings from "../components/ResourceListings";
import ViewAllResources from "../components/ViewAllResources";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <ResourceListings isHome={true} />
      <ViewAllResources />
      <ChatBot />
    </>
  );
};

export default HomePage;
