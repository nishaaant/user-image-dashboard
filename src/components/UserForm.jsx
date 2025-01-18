import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', socialHandle: '', images: [] });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialHandle', formData.socialHandle);
    Array.from(formData.images).forEach((file) => data.append('images', file));

    try {
      await axios.post('http://localhost:5000/api/submit', data);
      alert('Data submitted successfully!');
    } catch (err) {
      alert('Error submitting data.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">User Image Dashboard</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="socialHandle" className="block text-sm font-medium text-gray-700">
            Social Media Handle
          </label>
          <input
            type="text"
            name="socialHandle"
            id="socialHandle"
            placeholder="Enter your social media handle"
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleFileChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      <button
        onClick={() => navigate('/admin')}
        className="mt-6 px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
      >
        Go to Admin Dashboard
      </button>
    </div>
  );
};

export default UserForm;
