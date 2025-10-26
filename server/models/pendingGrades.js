const mongoose = require("mongoose");

const pendingGradesSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true},
  name: { type: String, required: true },
  department: { type: String },
  semester: { type: Number }
}, { Timestamps: true})


module.exports = mongoose.model("pendingGrades", pendingGradesSchema);
