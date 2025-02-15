import { useState, useEffect, useCallback, memo } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaSync } from 'react-icons/fa';
import { fetchRandomUser } from '../Services/userService';
import { handleError } from '../Utils/errorHandler';

const Card = memo(() => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRandomUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await fetchRandomUser();
      setDetails(userData);
    } catch (error) {
      const processedError = handleError(error);
      setError(processedError);
      console.error('Failed to load user:', processedError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRandomUser();
  }, [loadRandomUser]);

  const renderUserDetails = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <FaSync className="animate-spin text-3xl text-blue-500" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
      );
    }

    if (!details) return null;

    return (
      <div className="details space-y-3">
        <div className="card h-48 w-48 mx-auto -mt-24 mb-6 bg-white rounded-full shadow-lg overflow-hidden flex items-center justify-center">
          <img 
            src={details.picture.large} 
            alt={`${details.name.first} ${details.name.last}`} 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {details.name.first} {details.name.last}
        </h2>
        <div className="text-center space-y-2 text-gray-600">
          <p className="flex items-center justify-center">
            <FaEnvelope className="mr-2 text-blue-500" />
            {details.email}
          </p>
          <p className="flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            {details.location.city}, {details.location.country}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <div className="p-8">
          {renderUserDetails()}
        </div>
        <button 
          className={`w-full p-4 bg-blue-500 text-white font-semibold transition-colors duration-300 rounded-b-xl
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
          onClick={loadRandomUser}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get Random User'}
        </button>
      </div>
    </div>
  );
});

Card.displayName = 'ProfileCard';
export default Card;