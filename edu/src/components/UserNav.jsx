import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAuthActions } from '../hooks/useAuthActions'

const UserNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()
    const { signOut } = useAuthActions()

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-white hover:bg-red-600 px-4 py-2 rounded-md"
            >
                <img
                    src={user?.avatar}
                    alt="Profile"
                    className="w-11 h-11 rounded-full"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    
                    <Link
                        to="/my-resources"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        My Resources
                    </Link>
                    <button
                        onClick={() => {
                            signOut()
                            setIsOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserNav