
const Campaign = require("../models/Campaign");
const Request = require('../models/helpReq');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require('express');


const uploadOnCloudinary = require('../utils/cloudnary');




 const adminLoginController = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    if (admin.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    // Generate a token or session for the admin if needed
    const token = jwt.sign({ id: admin._id, role:admin.role }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.status(200).json({ message: "Admin Login successful", token });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }


}

// Campaign post by admin with img upload (post req)
const createCampaign = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file buffer to Cloudinary
    const imageUrl = await uploadOnCloudinary(req.file.buffer);
    
    console.log("Uploaded Image URL:", imageUrl); // Debugging

    if (!imageUrl) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    const newCampaign = new Campaign({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      image: imageUrl, // Fix: Use imageUrl
      description: req.body.description,
      target: req.body.target,
      raised: req.body.raised || 0,
      progress: req.body.progress || 0,
    });

    const result = await newCampaign.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ error: "Error creating campaign" });
  }
};



 const reqestedHelpController = async (req, res) => {
  console.log("Request received for help");
  try {
    const data = await Request.find({});
   
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching requested help" });
  }
};

const deleteHelpRequest = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the help request first
    const helpRequest = await Request.findById(id);
    if (!helpRequest) {
      return res.status(404).json({ error: "Help request not found" });
    }
    // Delete help request from the database
    await Request.findByIdAndDelete(id);

    res.status(200).json({ message: "Help request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting help request" });
  }
};


 const updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { title, date, location, description, target, raised, progress } = req.body;

  try {
    // Find the existing campaign
    const existingCampaign = await Campaign.findById(id);
    if (!existingCampaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    let imgUrl = existingCampaign.img; // Keep old image if no new image is uploaded

    // Check if a new image is uploaded
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse) {
        return res.status(500).json({ error: "Error uploading image" });
      }
      imgUrl = cloudinaryResponse.secure_url; // Update image URL
    }

    // Update the campaign
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { title, date, location, description, target, raised, progress, img: imgUrl },
      { new: true }
    );

    res.status(200).json(updatedCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating campaign" });
  }
};


 const deleteCampaign = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the campaign first
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    // Delete campaign from the database
    await Campaign.findByIdAndDelete(id);

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting campaign" });
  }
};



// getCampaign 
 const getCampaign = async (req, res) => {
  const data = await Campaign.find({});
  res.send(data);
}

module.exports = {
  adminLoginController,
  createCampaign,
  reqestedHelpController,
  updateCampaign,
  deleteCampaign,
  getCampaign,
  deleteHelpRequest
};