import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', socialHandle: '', images: [] });

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
    Array.from(formData.images).forEach(file => data.append('images', file));

    try {
      await axios.post('http://localhost:5000/api/submit', data);
      alert('Data submitted successfully!');
    } catch (err) {
      alert('Error submitting data.');
    }
  };

  return (<>
  <h1 className="text-center text-3xl font-bold my-4">User Image Dashboard</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="socialHandle"
        placeholder="Social Media Handle"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        name="images"
        multiple
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
    </>
  );
};

export default UserForm;
