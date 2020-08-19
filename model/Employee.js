const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  salary: String,
  efficiency: String,
  total_experience: String,
  image: String,
  created_on: {
    type: Date,
    default: new Date(),
  },
  updated_on: {
    type: Date,
  },
});

const Employee = mongoose.model("employee", schema);

module.exports = Employee;
