const express = require("express");
const { auth, adminOnly } = require("../middlewares/auth.middleware");
const {
  getAllServicesByUser,
  postService,
} = require("../controllers/service.controller");

const router = express.Router();
router.use(auth);
router.use(adminOnly);

router.get("/", getAllServicesByUser);
router.post("/", postService);

module.exports = router;
