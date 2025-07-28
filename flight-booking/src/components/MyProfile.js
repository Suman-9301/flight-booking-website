import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', mobile: '' });

  const token = localStorage.getItem('token'); // Assume JWT is stored here
  console.log(token);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setProfile(res.data);
      setForm({
        username: res.data.username,
        email: res.data.email,
        mobile: res.data.mobile
      });
    })
    .catch(err => {
      console.log(err);
      alert("Failed to load profile. Please login again.");
    });
  }, [token]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/profile`, form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setProfile(res.data);
      localStorage.setItem('username', res.data.username); // Update token if needed
      setEditing(false);
      alert("Profile updated successfully.");
    })
    .catch(err => {
      console.log(err);
      alert("Failed to update profile.");
    });
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
    My Profile
  </h2>
  
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">
      Username
    </label>
    <input
      type="text"
      name="username"
      value={form.username}
      disabled={!editing}
      onChange={handleChange}
      className={`w-full px-4 py-2 rounded border ${editing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
  
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">
      Email
    </label>
    <input
      type="email"
      name="email"
      value={form.email}
      disabled={!editing}
      onChange={handleChange}
      className={`w-full px-4 py-2 rounded border ${editing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
  
  <div className="mb-6">
    <label className="block text-gray-700 font-medium mb-2">
      Mobile
    </label>
    <input
      type="text"
      name="mobile"
      value={form.mobile}
      disabled={!editing}
      onChange={handleChange}
      className={`w-full px-4 py-2 rounded border ${editing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
  
  {editing ? (
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
      >
        Save Changes
      </button>
  ) : (
    <button
      onClick={() => setEditing(true)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
    >
      Edit Profile
    </button>
  )}
</div>
  );
};

export default Profile;
