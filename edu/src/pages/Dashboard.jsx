import React, { useEffect, useState } from "react";
import {
  FolderPlus,
  Book,
  Github,
  Star,
  MapPin,
  Link2,
  Briefcase,
  Users,
  Building2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

// interface Collection {
//   id: number;
//   name: string;
//   description: string;
//   stars: numb
// er;
// }

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "JavaScript Projects",
      description: "A collection of JavaScript projects and experiments",
      stars: 25,
    },
    {
      id: 2,
      name: "React Components",
      description: "Reusable React components for various projects",
      stars: 42,
    },
  ]);

  const fetchCollection = async () => {
    // /get/byCreator
    const response = await fetch(`${VITE_BASE_URL}/collection/get/byCreator`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch collections");
    }
    const data = await response.json();
    setCollections(data.data);
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
  });

  const handleAddCollection = () => {
    if (newCollection.name && newCollection.description) {
      setCollections([
        ...collections,
        {
          id: collections.length + 1,
          name: newCollection.name,
          description: newCollection.description,
          stars: 0,
        },
      ]);
      setNewCollection({ name: "", description: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      {/* <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <div className="flex items-center gap-2 px-4">
            <Github className="w-8 h-8" />
            <span className="text-xl font-bold">DevCollections</span>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="rounded-full w-64 h-64 mx-auto mb-4 relative flex items-center justify-center border-4 border-base-100 bg-base-100">
            {user?.avatar ? (
              // If an avatar URL is available, show the image
              <img
                src={user.avatar}
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              // Otherwise, show a default user icon
              <User className="w-24 h-24 text-gray-400" />
            )}

            {/* Online status indicator (unchanged) */}
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-base-100 rounded-full border-4 border-base-100 flex items-center justify-center">
              <span className="w-4 h-4 bg-success rounded-full"></span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
            <p className="text-base-content/70 mb-4">johnd • he/him</p>
            <button className="btn btn-outline w-full">Edit profile</button>
          </div>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>FULL STACK ENGINEER</span>
            </p>
            <p className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Tech University</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </p>
            <p className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              <a href="#" className="text-primary hover:underline">
                johnd.dev
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>
                <b>42</b> followers • <b>38</b> following
              </span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Collections</h1>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-collection")}
            >
              <FolderPlus className="w-5 h-5 mr-2" />
              New Collection
            </button>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <div key={collection.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Book className="w-5 h-5 text-primary" />
                      <h2 className="card-title">{collection.title}</h2>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{collection?.likes?.length}</span>
                    </div>
                  </div>
                  <p className="text-base-content/70">
                    {collection.description}
                  </p>
                  <div className="flex items-center">
                    {collection.tags &&
                      collection.tags.map((keywords) => (
                        <span
                          key={keywords}
                          className="badge badge-primary mr-2"
                        >
                          {keywords}
                        </span>
                      ))}
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button onClick={()=>navigate(`/collection/${collection._id}`)} className="btn btn-sm btn-outline">View Details</button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Collection Modal */}
      {/* {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create New Collection</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Collection Name</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter collection name" 
                className="input input-bordered w-full" 
                value={newCollection.name}
                onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
              />
            </div>
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="Enter collection description"
                value={newCollection.description}
                onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
              ></textarea>
            </div>
            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={handleAddCollection}
              >
                Create Collection
              </button>
              <button 
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )} */}
    </div>
  );
}

export default Dashboard;
