const express = require("express");

const router = express.Router();

const {
  createLead,
  publicCreateLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  assignLead,
  changeStatus,
  addNote,
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post("/public", publicCreateLead);
// Create
router.post("/", protect, createLead);

// Get
router.get("/", getLeads);
router.get("/:id", protect, getLead);

// Update
router.put("/:id", protect, updateLead);

// Delete (Admin Only)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteLead
);

// Assign (Admin Only)
router.put(
  "/assign/:id",
  protect,
  authorize("admin"),
  assignLead
);

// Change Status
router.put(
  "/status/:id",
  protect,
  changeStatus
);

// Add Note
router.post(
  "/note/:id",
  protect,
  addNote
);


module.exports = router;