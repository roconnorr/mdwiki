const express = require("express");
const router = express.Router();

const page_controller = require("./controllers/pageController");

// page routes
router.get("/page", page_controller.page_list);

router.get("/page/:pageId", page_controller.page_detail);

router.post("/page", page_controller.page_create);

module.exports = router;
