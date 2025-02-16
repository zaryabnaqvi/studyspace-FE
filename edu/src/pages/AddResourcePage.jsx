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

  const navigate = useNavigate();
  const {collectionId}=useParams()

  const submitForm = async (e) => {
    e.preventDefault();

    const newResource = {
      title,
      type,
      level,
      description,
      createdBy,
      info: {
        category,
        link,
        published,
      },
      collectionId:collectionId
    };

    try {
      await addResourceSubmit(newResource);

      toast.success("Resource added successfully!");

      return navigate(-1);
    } catch (err) {
      toast.error("Failed to add resource");
      console.error("Error adding resource: ", err);
    }
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white text-black px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6 {bg}">
              Add a Resource
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Resource Type{" "}
                <span className="text-xs text-red-600"> *required</span>
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

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Resource Name{" "}
                <span className="text-xs text-red-600"> *required</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`border rounded w-full py-2 px-3 mb-2 ${bg}`}
                placeholder="eg. JavaScript for Dummies"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description{" "}
                <span className="text-xs text-red-600"> *required</span>
              </label>
              <textarea
                id="description"
                name="description"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                rows="4"
                placeholder="Briefly describe the resource"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Created By{" "}
                <span className="text-xs text-red-600"> *required</span>
              </label>
              <input
                type="text"
                id="createdBy"
                name="createdBy"
                className={`border rounded w-full py-2 px-3 mb-2 ${bg}`}
                placeholder="Who created this resource? Can be a username, real name, etc."
                required
                value={createdBy}
                onChange={(e) => setcreatedBy(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Resource Level{" "}
                <span className="text-xs text-red-600"> *required</span>
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

            <h3 className="text-2xl mb-5">Additional Resource Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Resource Category{" "}
                <span className="text-xs text-red-600"> *required</span>
              </label>
              <select
                id="category"
                name="category"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Game Development">Game Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="DevOps">DevOps</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Artifical Intelligence">
                  Artifical Intelligence
                </option>
                <option value="Data Structures and Algorithms">
                  Data Structures and Algorithms
                </option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Database Management">Database Management</option>
                <option value="Agile and Scrum">Agile and Scrum</option>
                <option value="Career Development">Career Development</option>
                <option value="General Skills">General Skills</option>
                <option value="Business and Entrepreneurship">
                  Business and Entrepreneurship
                </option>
                <option value="Marketing">Marketing</option>
                <option value="Product Management">Product Management</option>
                <option value="Blockchain and Cryptocurrencies">
                  Blockchain and Cryptocurrencies
                </option>
                <option value="Design">Design</option>
                <option value="Networking">Networking</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Resource Link{" "}
                <span className="text-xs text-red-600"> *required</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                placeholder="Resource Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Publishing Year{" "}
                <span className="text-xs text-gray-500"> (optional)</span>
              </label>
              <input
                type="number"
                id="published"
                name="published"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                placeholder="Enter the year this resource was initally published"
                value={published}
                onChange={(e) => setPublished(e.target.value)}
              />
            </div>

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
