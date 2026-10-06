import { Router } from "express";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import { protect, allowRoles } from "../middleware/auth.js";
const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const { q = "", location = "", type = "" } = req.query;
    const filter = {};
    if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { company: { $regex: q, $options: "i" } }, { skills: { $regex: q, $options: "i" } }];
    if (location) filter.location = { $regex: location, $options: "i" };
    if (type) filter.type = type;
    const jobs = await Job.find(filter).populate("recruiter", "name").sort({ createdAt: -1 }).limit(100);
    res.json({ jobs });
  } catch (e) { next(e); }
});
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid job ID." });
    const job = await Job.findById(req.params.id).populate("recruiter", "name");
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ job });
  } catch (e) { next(e); }
});
router.post("/", protect, allowRoles("recruiter"), async (req, res, next) => {
  try {
    const { title, company, location, type, workplace, salary, description, skills } = req.body;
    if (!title?.trim() || !company?.trim() || !location?.trim() || !description?.trim()) return res.status(400).json({ message: "Title, company, location and description are required." });
    const job = await Job.create({ title, company, location, type, workplace, salary, description, skills: Array.isArray(skills) ? skills : String(skills || "").split(",").map(s => s.trim()).filter(Boolean), recruiter: req.user._id });
    res.status(201).json({ job });
  } catch (e) { next(e); }
});
router.put("/:id", protect, allowRoles("recruiter"), async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    if (!job.recruiter.equals(req.user._id)) return res.status(403).json({ message: "You can only edit your own job posts." });
    const allowed = ["title", "company", "location", "type", "workplace", "salary", "description", "skills"];
    allowed.forEach(key => { if (req.body[key] !== undefined) job[key] = req.body[key]; });
    await job.save();
    res.json({ job });
  } catch (e) { next(e); }
});
router.delete("/:id", protect, allowRoles("recruiter"), async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    if (!job.recruiter.equals(req.user._id)) return res.status(403).json({ message: "You can only delete your own job posts." });
    await Application.deleteMany({ job: job._id });
    await job.deleteOne();
    res.json({ message: "Job deleted." });
  } catch (e) { next(e); }
});
router.post("/:id/apply", protect, allowRoles("candidate"), async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    const application = await Application.create({ job: job._id, candidate: req.user._id, coverLetter: req.body.coverLetter || "" });
    res.status(201).json({ application, message: "Application submitted successfully." });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: "You have already applied for this job." });
    next(e);
  }
});
export default router;
