import { Router } from "express";
import applicationRoutes from "../../features/applications/application.routes.js";
import authRoutes from "../../features/authentications/auth.routes.js";
import bookmarkRoutes from "../../features/bookmarks/bookmark.routes.js";
import categoryRoutes from "../../features/categories/category.routes.js";
import companyRoutes from "../../features/companies/company.routes.js";
import documentRoutes from "../../features/documents/document.routes.js";
import jobRoutes from "../../features/jobs/job.routes.js";
import profileRoutes from "../../features/profiles/profile.routes.js";
import userRoutes from "../../features/users/user.routes.js";

const router = Router();

router.get("/", (_req, res) => {
	res.render("index", { title: "Express" });
});

router.use("/", userRoutes);
router.use("/", authRoutes);
router.use("/", companyRoutes);
router.use("/", categoryRoutes);
router.use("/", profileRoutes);
router.use("/", jobRoutes);
router.use("/", applicationRoutes);
router.use("/", documentRoutes);
router.use("/", bookmarkRoutes);

export default router;
