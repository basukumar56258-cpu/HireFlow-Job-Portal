import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
const router = Router();
const safeUser = user => ({ id: user._id, name: user.name, email: user.email, role: user.role, headline: user.headline });
const tokenFor = user => jwt.sign({ id: user._id }, process.env.JWT_SECRET || "dev_only_change_this_secret", { expiresIn: "7d" });

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ message: "Name, email and password are required." });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
    if (role && !["candidate", "recruiter"].includes(role)) return res.status(400).json({ message: "Invalid account role." });
    if (await User.findOne({ email: email.toLowerCase().trim() })) return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ name: name.trim(), email, password: await bcrypt.hash(password, 12), role: role || "candidate" });
    res.status(201).json({ token: tokenFor(user), user: safeUser(user) });
  } catch (e) { next(e); }
});
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase().trim() }).select("+password");
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password))) return res.status(401).json({ message: "Email or password is incorrect." });
    res.json({ token: tokenFor(user), user: safeUser(user) });
  } catch (e) { next(e); }
});
router.get("/me", protect, (req, res) => res.json({ user: safeUser(req.user) }));
export default router;
