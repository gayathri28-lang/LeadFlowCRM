const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const leadSchema = new mongoose.Schema(
  {
    // Public Form
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    budgetRange: {
      type: String,
      enum: [
        "Below ₹10,000",
        "₹10,000 - ₹50,000",
        "₹50,000 - ₹1,00,000",
        "Above ₹1,00,000",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional
    phone: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    // Admin
    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Closed",
      ],
      default: "New",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notes: [noteSchema],

    activities: [activitySchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);
