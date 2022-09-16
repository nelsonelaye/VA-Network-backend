const express = require("express");
const router = express.Router();
const {
  getAllVolunteers,
  getOneVolunteer,
  registerVolunteer,
  loginVolunteer,
  updateVolunteer,
  deleteVolunteer,
  deleteAll,
  verifyVolunteer,
} = require("../handler/volunteer");

router.route("/volunteer").get(getAllVolunteers).delete(deleteAll);
router.post("/volunteer/login", loginVolunteer);
router.post("/volunteer/register", registerVolunteer);
router
  .route("/volunteer/:volunteerId")
  .get(getOneVolunteer)
  .patch(updateVolunteer)
  .delete(deleteVolunteer);

router.get("/volunteer/:volunteerId/verify/:token", verifyVolunteer);
module.exports = router;
