import { useState, useEffect } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const EditCollectionPage = ({ updateCollectionSubmit, bg = "focus:outline-none focus:ring-0 focus:border-red-500 border-2 caret-red-500" }) => {
  const collection = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    if (user && collection) {
      if (user._id !== collection.user._id) {
        toast.error("Unauthorised: You can only edit your own collections");
        navigate("/collections");
        return;
      }
    }
  }, [user, collection, navigate]);

  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [category, setCategory] = useState(collection.category);
  const [visibility, setVisibility] = useState(collection.visibility);

  const submitForm = async (e) => {
    e.preventDefault();

    if (user._id !== collection.user._id) {
      toast.error("Unauthorised: You can only edit your own collections");
      navigate("/collections");
      return;
    }

    const updatedCollection = {
      id,
      name,
      description,
      category,
      visibility,
    };

    try {
      await updateCollectionSubmit(updatedCollection);
      toast.success("Collection updated successfully!");
      return navigate(`/collection/${id}`);
    } catch (err) {
      toast.error("Failed to edit collection");
      console.error("Error editing collection: ", err);
    }
  };

  if (!user || !collection) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Update Collection</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Collection Name <span className="text-xs text-red-600">*required</span></label>
              <input
                type="text"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                className={`border rounded w-full py-2 px-3 ${bg}`}
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Category <span className="text-xs text-red-600">*required</span></label>
              <input
                type="text"
                className={`border rounded w-full py-2 px-3 ${bg}`}
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Visibility</label>
              <select
                className={`border rounded w-full py-2 px-3 ${bg}`}
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Collection
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCollectionPage;
