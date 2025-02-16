import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Book, Star, Link2, Plus, Pencil, Trash2 } from 'lucide-react';


const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";


export function CollectionDetails({ onUpdateCollection }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection,setCollection] = useState();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedCollection, setEditedCollection] = useState(collection);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', url: '', description: '' });
  

  const fetchCollectionAndResource=async()=>{
    try {
      const response = await fetch(`${VITE_BASE_URL}/collection/getById/${id}`,{
        method: 'GET',
        headers: { 
            'Content-Type':"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
    
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCollection(data.data);
      setEditedCollection(data.data);
      const resources = await fetch(`${VITE_BASE_URL}/resource/get/byCollection/${id}`,
        {
            method: 'GET',
            headers: { 
                'Content-Type':"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }

      )
      if (!resources.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const rec = await resources.json();

      setResources(rec.data)

    } catch (error) {
      console.error('Error fetching collection:', error);
    }
  }
  const [resources,setResources] = useState([
    {
      id: 1,
      title: "React Documentation",
      url: "https://react.dev",
      description: "Official React documentation"
    },
    {
      id: 2,
      title: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/",
      description: "The official TypeScript documentation"
    }
  ]);

  useEffect(()=>{
    fetchCollectionAndResource()
  },[])

  if (!collection) {
    return (
      <div className="flex-1 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Collection not found</h2>
          <Link to="/" className="btn btn-primary">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveChanges = () => {
    if (editedCollection) {
      onUpdateCollection(collection.id, editedCollection);
      setIsEditing(false);
    }
  };

  const handleAddResource = () => {
    // Add resource logic here
    navigate(`/add-resource/${id}`)
    // setIsAddingResource(false);
    // setNewResource({ title: '', url: '', description: '' });
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <Link to="/" className="btn btn-ghost gap-2 mb-4">
          ← Back to Collections
        </Link>
        
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Book className="w-8 h-8 text-primary" />
            {isEditing ? (
              <input
                type="text"
                className="input input-bordered text-2xl font-bold"
                value={editedCollection?.title}
                onChange={(e) => setEditedCollection({ ...editedCollection, title: e.target.value })}
              />
            ) : (
              <h1 className="text-3xl font-bold">{collection.title}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <Star className="w-5 h-5" />
              <span className="text-lg">{collection.stars}</span>
            </div>
            {isEditing ? (
              <>
                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-outline gap-2" onClick={() => setIsEditing(true)}>
                <Pencil className="w-4 h-4" />
                Edit Collection
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <textarea
            className="textarea textarea-bordered w-full mt-4"
            value={editedCollection?.description}
            onChange={(e) => setEditedCollection({ ...editedCollection, description: e.target.value })}
          />
        ) : (
          <p className="text-base-content/70 mt-4">{collection.description}</p>
        )}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Resources</h2>
          <button 
            className="btn btn-primary gap-2"
            onClick={() =>    navigate(`/add-resources/${id}`)
        }
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </button>
        </div>

        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource._id} onClick={()=>{
                navigate("/resource/" + resource._id)
            }} className="card bg-base-100 shadow-lg  cursor-pointer">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-base-content/70 mb-4">{resource.description}</p>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Link2 className="w-4 h-4" />
                      {resource.url}
                    </a>
                  </div>
                  <button className="btn btn-ghost btn-sm text-error">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAddingResource && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add New Resource</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Resource Title</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter resource title" 
                className="input input-bordered w-full" 
                value={newResource.title}
                onChange={(e) => setNewResource({...newResource, title: e.target.value})}
              />
            </div>
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">URL</span>
              </label>
              <input 
                type="url" 
                placeholder="Enter resource URL" 
                className="input input-bordered w-full" 
                value={newResource.url}
                onChange={(e) => setNewResource({...newResource, url: e.target.value})}
              />
            </div>
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="Enter resource description"
                value={newResource.description}
                onChange={(e) => setNewResource({...newResource, description: e.target.value})}
              ></textarea>
            </div>
            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={handleAddResource}
              >
                Add Resource
              </button>
              <button 
                className="btn"
                onClick={() => setIsAddingResource(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsAddingResource(false)}></div>
        </div>
      )}
    </div>
  );
}