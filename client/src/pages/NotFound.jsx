import React from 'react';

function NotFoundPage() {
  return (
    <div className="h-2/3 flex items-center justify-center bg-transparent">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for does not exist.</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
