import { Router } from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { protect, allowRoles } from "../middleware/auth.js";
const router = Router();
router.get("/mine", protect, allowRoles("candidate"), async (req, res, next) => {
  try {
    const applications = await Application.find({ candidate: req.user._id }).populate({ path: "job", select: "title company location type salary" }).sort({ createdAt: -1 });
    res.json({ applications });
  } catch (e) { next(e); }
});
router.get("/recruiter", protect, allowRoles("recruiter"), async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id }).select("_id title company");
    const applications = await Application.find({ job: { $in: jobs.map(j => j._id) } })
      .populate("candidate", "name email headline").populate("job", "title company").sort({ createdAt: -1 });
    res.json({ applications, jobsCount: jobs.length });
  } catch (e) { next(e); }
});
router.patch("/:id/status", protect, allowRoles("recruiter"), async (req, res, next) => {
  try {
    const allowed = ["Submitted", "In Review", "Shortlisted", "Rejected"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid application status." });
    const application = await Application.findById(req.params.id).populate("job");
    if (!application) return res.status(404).json({ message: "Application not found." });
    if (!application.job.recruiter.equals(req.user._id)) return res.status(403).json({ message: "Not authorized." });
    application.status = req.body.status;
    await application.save();
    res.json({ application });
  } catch (e) { next(e); }
});
export default router;
