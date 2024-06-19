const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student's name address is required"],
  },
  roll: {
    type: Number,
    required: [true, "Student's roll number  is required"],
  },
  studentClass: {
    type: String,
    required: [true, "Class is required"]
  },
  test: [
    {
      level: Number,
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});


module.exports = mongoose.model("Student", studentSchema);