import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  company: { type: String, required: true, trim: true, maxlength: 120 },
  location: { type: String, required: true, trim: true },
  type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"], default: "Full-time" },
  workplace: { type: String, enum: ["On-site", "Hybrid", "Remote"], default: "On-site" },
  salary: { type: String, default: "Not disclosed" },
  description: { type: String, required: true, maxlength: 8000 },
  skills: [{ type: String, trim: true }],
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
export default mongoose.model("Job", jobSchema);
