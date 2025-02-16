import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import ResourceListing from "./ResourceListing";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VITE_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const ITEMS_PER_PAGE = 24;

const ResourceListings = ({ isHome = false }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allResources, setAllResources] = useState([]); // Store all resources for client-side filtering
  const [filters, setFilters] = useState({
    type: "",
    level: "",
    category: "",
  });

  //hello world how are you...? yes we are typing like madmen

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const apiUrl = isHome
          ? `${VITE_BASE_URL}/resources?limit=6`
          : `${VITE_BASE_URL}/resources?limit=1000`; // Fetch all resources for client-side filtering

        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch resources. HTTP error! status: ${res.status}`
          );
        }

        const data = await res.json();
        console.log(data);
        setAllResources(data.resources);
        setResources(data.resources);
      } catch (err) {
        console.error("Error fetching data:", err);
        // setError(`Error fetching resources: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [isHome]);

  // Apply filters and pagination
  useEffect(() => {
    if (!isHome) {
      const filteredResources = allResources.filter((resource) => {
        return (
          (!filters.type || resource.type === filters.type) &&
          (!filters.level || resource.level === filters.level) &&
          (!filters.category || resource.info.category === filters.category)
        );
      });

      // Calculate total pages based on filtered results
      const newTotalPages = Math.ceil(
        filteredResources.length / ITEMS_PER_PAGE
      );
      setTotalPages(newTotalPages);

      // Reset to page 1 if current page is out of bounds
      if (currentPage > newTotalPages) {
        setCurrentPage(1);
      }

      // Paginate the filtered results
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedResources = filteredResources.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );
      setResources(paginatedResources);
    }
  }, [filters, currentPage, allResources, isHome]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const typeOptions = [
    "Book",
    "Repository",
    "Video",
    "Website",
    "Bootcamp",
    "Youtube Channel",
    "Course",
    "Community",
  ];
  const levelOptions = ["Beginner", "Intermediate", "Advanced", "Everyone"];
  const categoryOptions = [
    "Web Development",
    "Mobile Development",
    "Game Development",
    "Data Science",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Artifical Intelligence",
    "Data Structures and Algorithms",
    "Machine Learning",
    "Database Management",
    "Agile and Scrum",
    "Career Development",
    "General Skills",
    "Business and Entrepreneurship",
    "Marketing",
    "Product Management",
    "Blockchain and Cryptocurrencies",
    "Design",
    "Networking",
  ];

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      {!isHome && (
        <div className="mx-4 md:mx-8 lg:mx-28 mb-8 py-4 px-4 md:px-8 rounded-lg shadow mt-8">
          <h2 className="text-xl font-bold mb-4 text-black">
            Filter Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-700">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 border-2 rounded bg-white text-black focus:outline-none focus:ring-0 focus:border-red-500"
              >
                <option value="">All Types</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700">Level</label>
              <select
                name="level"
                value={filters.level}
                onChange={handleFilterChange}
                className="w-full p-2 border-2 rounded bg-white text-black focus:outline-none focus:ring-0 focus:border-red-500"
              >
                <option value="">All Levels</option>
                {levelOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border-2 rounded bg-white text-black focus:outline-none focus:ring-0 focus:border-red-500"
              >
                <option value="">All Categories</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => {
                setFilters({ type: "", level: "", category: "" });
                setCurrentPage(1);
              }}
              className="px-4 py-2 text-gray-600 bg-white rounded-md hover:bg-gray-200 transition duration-200"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <section className="bg-red-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
            {isHome ? "Recently Posted Resources" : "Browse Resources"}
          </h2>

          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <ResourceListing key={resource._id} resources={resource} />
                ))}
              </div>

              {!isHome && totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ResourceListings;
