import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import MessagePopup from '../components/MessagePopup';
import '../MessagePop.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestHelp() {
  const [formData, setFormData] = useState({
    name: '',
    regno: '',
    email: '',
    phone: '',
    helpType: '',
    description: '',
  });
  
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    const token = localStorage.getItem("token"); 
    const formDataWithImage = new FormData();
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("regno", formData.regno);
    formDataWithImage.append("email", formData.email);
    formDataWithImage.append("phnno", formData.phone);
    formDataWithImage.append("typeOfHelp", formData.helpType);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("image", image); // Must match backend field name
  
    try {
      const response = await axios.post("http://localhost:8080/api/user/helpRequest", formDataWithImage, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Ensure token is included
        }
      });
  
      // console.log("Response:", response.data);
      toast.success("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error.response || error.message);
      toast.error("Failed to submit request!");
    } finally {
      setFormData({
        name: '',
        regno: '',
        email: '',
        phone: '',
        helpType: '',
        description: '',
      });
      setImage(null); // Reset image after submission

      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Request Help</h1>
          <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div className="grid md:grid-cols-2 gap-6">
            {['name', 'regno', 'email', 'phone'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Help Needed</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.helpType}
              onChange={(e) => setFormData({ ...formData, helpType: e.target.value })}
            >
              <option value="">Select type of help</option>
              <option value="medical">Medical Assistance</option>
              <option value="education">Educational Support</option>
              <option value="food">Food Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              required
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
            <Send className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default RequestHelp;
