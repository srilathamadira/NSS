const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/User');
const Admin = require('../models/Admin'); 
const bcrypt = require('bcrypt');



mongoose.connect("mongodb://localhost:27017/NSS").then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error));


   /*async function createAdmin() {
    const admin = new User({
        username:"srilu",
        email:"srilu@gmail.com",
        password:"srilu@123",
        role:"admin"
    });
    try {
        await admin.save();
        console.log('Admin created successfully:', admin);
    } catch (error) {
        console.error('Error creating admin:', error);
    }
  }
  createAdmin(); */
  async function createAdmin() {
    const hashedPassword = await bcrypt.hash("divya@123", 10); // Hash the password
    const admin = new Admin({
        username: "divya",
        email: "divya@gmail.com",
        password: hashedPassword, // Save the hashed password
        role: "admin" // Role is explicitly set to "admin"
    });
    try {
        await admin.save();
        console.log('New admin created successfully:', admin);
    } catch (error) {
        console.error('Error creating new admin:', error);
    }
}
createAdmin();