import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 border rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p>{user.socialHandle}</p>
            <div className="grid grid-cols-3 gap-2">
              {user.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${img}`}
                  alt={`User upload ${index}`}
                  className="w-full h-24 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
