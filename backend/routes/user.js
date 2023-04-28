const express = require("express");
const router = express.Router();
const { login, register, getOneUser } = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/:id", auth, getOneUser);

module.exports = router;
