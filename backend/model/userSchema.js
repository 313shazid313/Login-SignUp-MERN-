const mongoose = require("mongoose");
const model =new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password :{
    type : String,
    required:true,
  },
  createOn :{
    type:Date,
    default:Date.now
  }

});
const userModel = mongoose.model('userModel',model);
module.exports = userModel;