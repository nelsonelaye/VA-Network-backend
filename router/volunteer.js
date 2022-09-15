const express = require("express");
const router = express.Router();
const {
  getAllVolunteers,
  getOneVolunteer,
  register,
  login,
  updateVolunteer,
  deleteVolunteer,
  deleteAll,
} = require("../handler/volunteer");

router.route("/volunteer").get(getAllVolunteers).delete(deleteAll);
router.post("/volunteer/login", login);
router.post("/volunteer/register", register);
router
  .route("/volunteer/:volunteerId")
  .get(getOneVolunteer)
  .patch(updateVolunteer)
  .delete(deleteVolunteer);

module.exports = router;
