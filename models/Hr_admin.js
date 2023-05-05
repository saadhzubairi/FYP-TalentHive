// models/hr_admin.js

const mongoose = require('mongoose');

const hr_adminSchema = new mongoose.Schema({
  name: {
    type: String,
  
  },
  Cid: {
    type: String,
   
  },
  hrId: {
    type: String,
   
  },
 
  joined_date: {
    type: Date
  },
  email: {
    type: String
  },

  isActive: {
    type: String
  },

  
  logo: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = hr_admin = mongoose.model('hr_admin', hr_adminSchema);