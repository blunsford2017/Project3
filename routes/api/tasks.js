const express = require("express");
const router = express.Router();
const tasksCtrl = require("../../controllers/tasks");

router.get("/", tasksCtrl.index);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require("../../config/auth"));
// Adds checkAuth so if a user is NOT signed in or token is not valid, gives "Not Authorized" error.
// If user is valid, allows them to hit the route:
router.post("/", checkAuth, tasksCtrl.create);

// Restrict access so ONLY valid authenticated users can access the route:
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;