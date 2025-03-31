import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignRequestList = ({requests, handleDeleteRequest}) => {
 
  
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-70 ">
            <img
              src={request.img} // Use `img` property from the API response
              alt="Donate"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2 text-gray-800">{request.name}</h5>
              <p className="text-lg font-bold text-gray-600">{request.regno}</p>
              <div className="mt-2 text-gray-600">
                <p><strong>Email:</strong> <span className="text-gray-800">{request.email}</span></p>
                <p><strong>Phone:</strong> <span className="text-gray-800">{request.phnno}</span></p>
                <p><strong>Type of Help:</strong> <span className="text-gray-800">{request.typeOfHelp}</span></p>
              </div>
              <p className="mt-4 text-gray-700">{request.description}</p>
              <button
                onClick={() => handleDeleteRequest(request._id)}
                className="bg-red-600 text-white py-2 px-4 rounded mt-4 hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700 text-xl col-span-full">No campaign requests at the moment.</p>
      )}
    </div>
  );
};

export default CampaignRequestList;
