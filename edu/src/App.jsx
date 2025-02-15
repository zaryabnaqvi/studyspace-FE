import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ResourcesPage from './pages/ResourcesPage'
import ResourcePage, { resourceLoader } from './pages/ResourcePage'
import AddResourcePage from './pages/AddResourcePage'
import EditResourcePage from './pages/EditResourcePage'
import NotFoundPage from './pages/NotFoundPage'
import MyResourcesPage from './components/MyResourcesPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import AddCollectionPage from './pages/AddCollectionPage'
import EditCollectionPage from './pages/EditCollectionPage'

const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';


const App = () => {

  const { user } = useAuth()

  //^RESOURCE FUNCTIONS
  //! Add a Resource
  const addResource = async (newResource) => {
    try {
      const res = await fetch(`${VITE_API_URL}/resource/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...newResource,
          user: user._id
        })
      })

      if (!res.ok) {
        throw new Error('Failed to add resource')
      }

      const data = await res.json();
      return data
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  }

  const addCollection = async (newCollection) => {
    try {
      const res = await fetch(`${VITE_API_URL}/collection/new.`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({newCollection})
      })

      if (!res.ok) {
        throw new Error('Failed to add resource')
      }

      const data = await res.json();
      return data
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  }

  const updateCollection = async (collecion) => {
    try {
      const res = await fetch(`${VITE_API_URL}/collecion/update/${collecion._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({collecion})
      });

      if (!res.ok) {
        throw new Error('Failed to update collecion');
      }

      return await res.json();
    } catch (error) {
      console.error('Error updating collecion:', error);
      throw error;
    }
  }


  //! Delete a Resource
  const deleteResource = async (id) => {
    try {
      const res = await fetch(`${VITE_API_URL}/resources/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete resource');
      }

      return await res.json();
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  }

  // ! Update a Resource
  const updateResource = async (resource) => {
    try {
      const res = await fetch(`${VITE_API_URL}/resources/${resource.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
      });

      if (!res.ok) {
        throw new Error('Failed to update resource');
      }

      return await res.json();
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  }

  //^REACT ROUTER
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>

        <Route index element={<HomePage />} />
        <Route path='/login' element={< Login />} />
        <Route path='/resources' element={<ResourcesPage />} />

        {/* Protected Routes, can only access them once logged in. */}
        <Route path='/add-resources' element={
          //* Protected
          // <ProtectedRoute user={user}>
            <AddResourcePage addResourceSubmit={addResource} />
          // </ProtectedRoute>
        }
        />

        <Route path='/add-collection' element={
          //* Protected
          // <ProtectedRoute user={user}>
            <AddCollectionPage addCollectionSubmit={addCollection} />
          // </ProtectedRoute>
        }
        />

        <Route path='/edit-collection/:id' element={
          //* Protected
          // <ProtectedRoute user={user}>
            <EditCollectionPage updateCollectionSubmit={updateCollection} />
          // </ProtectedRoute> 
        }
          loader={resourceLoader}
        />

        <Route path='/edit-resource/:id' element={
          //* Protected
          <ProtectedRoute user={user}>
            <EditResourcePage updateResourceSubmit={updateResource} />
          </ProtectedRoute>
        }
          loader={resourceLoader}
        />

        <Route path='/my-resources' element={
          <ProtectedRoute user={user}>
            <MyResourcesPage />
          </ProtectedRoute>
        }
        />
      {/* Protected Routes end above */}

        <Route path='/resource/:id' element={
          <ResourcePage deleteResource={deleteResource} />}
          loader={resourceLoader}
        />

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App