import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Back to User Form
        </button>
      </div>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-500 mb-4">{user.socialHandle}</p>
              <div className="grid grid-cols-3 gap-2">
                {user.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${img}`}
                    alt={`User upload ${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">No user submissions found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
