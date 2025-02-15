import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCollectionPage = ({ addCollectionSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (tags.trim()) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      const invalidTags = tagArray.filter((tag) => !/^[a-zA-Z0-9]+$/.test(tag));
      if (invalidTags.length > 0) {
        newErrors.tags = "Tags must contain only letters and numbers.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newCollection = {
      title,
      description,
      visibility,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      await addCollectionSubmit(newCollection);
      toast.success("Collection added successfully!");
      navigate("/collections");
    } catch (err) {
      toast.error("Failed to add collection");
      console.error("Error adding collection: ", err);
    }
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white text-black px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add a Collection
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Collection Name <span className="text-xs text-red-600"> *required</span>
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter collection title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description <span className="text-xs text-red-600"> *required</span>
              </label>
              <textarea
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Briefly describe the collection"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Visibility */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Visibility
              </label>
              <select
                className="border rounded w-full py-2 px-3"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="e.g. JavaScript, Web Dev, Programming"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full w-full"
                type="submit"
              >
                Add Collection
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCollectionPage;
