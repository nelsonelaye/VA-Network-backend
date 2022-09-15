const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../handler/project");

router.route("/ngo/:ngoId/project").get(getAllProjects).post(createProject);
router
  .route("/ngo/:ngoId/project/:projectId")
  .get(getOneProject)
  .patch(updateProject)
  .delete(deleteProject);

module.exports = router;
