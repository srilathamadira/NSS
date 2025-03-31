const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/User');





mongoose.connect("mongodb+srv://221fa04507:Jv4MeWLYmW10PaLh@cluster0.aubau.mongodb.net/nss?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error));


  async function createAdmin() {
    const admin = new User({
        username:"shivam",
        email:"shivam@gmail.com",
        password:"shivam@123",
        role:"admin"
    });
    try {
        await admin.save();
        console.log('Admin created successfully:', admin);
    } catch (error) {
        console.error('Error creating admin:', error);
    }
  }
  createAdmin();