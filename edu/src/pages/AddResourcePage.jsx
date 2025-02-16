import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddResourcePage = ({
  addResourceSubmit,
  bg = "focus:outline-none focus:ring-0 focus:border-red-500 border-2 caret-red-500",
}) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Book");
  const [level, setLevel] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [createdBy, setcreatedBy] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [link, setLink] = useState("");
  const [published, setPublished] = useState("N/A");
  const [file, setFile] = useState(null); // New state for file input

  const navigate = useNavigate();
  const { collectionId } = useParams();

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
  const submitForm = async (e) => {
    e.preventDefault();

    // Creating FormData to handle text and file inputs
    const formData = new FormData();
    const info = {
      category,
      link,
      published
  };
  
  // Append the entire object as a JSON string
  formData.append("info[category]", info.category);
  formData.append("info[link]", info.link);
  formData.append("info[published]", info.published);

    formData.append("title", title);
    formData.append("type", type);
    formData.append("level", level);
    formData.append("description", description);
    formData.append("createdBy", createdBy);
   
    formData.append("collectionId", collectionId);

    if (file) {
      formData.append("file", file); // Append file if exists
    }

    try {
      await addResourceSubmit(formData); // Ensure `addResourceSubmit` handles FormData
      toast.success("Resource added successfully!");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to add resource");
      console.error("Error adding resource: ", err);
    }
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white text-black px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm} encType="multipart/form-data">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add a Resource
            </h2>

            {/* Resource Type */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                Resource Type <span className="text-xs text-red-600"> *required</span>
              </label>
              <select
                id="type"
                name="type"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Book">Book</option>
                <option value="Repository">Repository</option>
                <option value="Video">Video</option>
                <option value="Website">Website</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Youtube Channel">Youtube Channel</option>
                <option value="Course">Course</option>
                <option value="Community">Community</option>
              </select>
            </div>

            {/* Resource Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Resource Name <span className="text-xs text-red-600"> *required</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`border rounded w-full py-2 px-3 mb-2 ${bg}`}
                placeholder="e.g., JavaScript for Dummies"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Upload File <span className="text-xs text-gray-500"> (optional)</span>
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description <span className="text-xs text-red-600"> *required</span>
              </label>
              <textarea
                id="description"
                name="description"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                rows="4"
                placeholder="Briefly describe the resource"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Created By */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Created By <span className="text-xs text-red-600"> *required</span>
              </label>
              <input
                type="text"
                id="createdBy"
                name="createdBy"
                className={`border rounded w-full py-2 px-3 mb-2 ${bg}`}
                placeholder="Who created this resource?"
                required
                value={createdBy}
                onChange={(e) => setcreatedBy(e.target.value)}
              />
            </div>

            {/* Resource Level */}
            <div className="mb-4">
              <label htmlFor="level" className="block text-gray-700 font-bold mb-2">
                Resource Level <span className="text-xs text-red-600"> *required</span>
              </label>
              <select
                id="level"
                name="level"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                required
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Everyone">Everyone</option>
              </select>
            </div>

            {/* Resource Link */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Resource Link <span className="text-xs text-red-600"> *required</span>
              </label>
              <input
                type="text"
                id="link"
                name="link"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                placeholder="Enter the resource link"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            {/* Category */}
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                Category <span className="text-xs text-red-600"> *required</span>
              </label>
              <select
                id="category"
                name="category"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Publishing Year */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Publishing Year <span className="text-xs text-gray-500"> (optional)</span>
              </label>
              <input
                type="number"
                id="published"
                name="published"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                placeholder="Enter the publishing year"
                value={published}
                onChange={(e) => setPublished(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddResourcePage;
