const Lead = require("../models/lead");

// Create Lead
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      activities: [
        {
          action: "Lead Created",
          performedBy: req.user._id,
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Public Lead Submission
// Public Lead Submission
exports.publicCreateLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      budgetRange,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !budgetRange ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      budgetRange,
      message,
      status: "New",
      activities: [],
      notes: [],
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Leads
// Get All Leads
exports.getLeads = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filter = {};

    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Search by name, email or company
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Lead.countDocuments(filter);

    res.json({
      success: true,
      total,
      page,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Lead
exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Lead
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    Object.assign(lead, req.body);

    lead.activities.push({
      action: "Lead Updated",
      performedBy: req.user._id,
    });

    await lead.save();

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Assign Lead
exports.assignLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.assignedTo = req.body.userId;

    lead.activities.push({
      action: "Lead Assigned",
      performedBy: req.user._id,
    });

    await lead.save();

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Status
exports.changeStatus = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.status = req.body.status;

    lead.activities.push({
      action: `Status changed to ${req.body.status}`,
      performedBy: req.user._id,
    });

    await lead.save();

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Note
exports.addNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.notes.push({
      text: req.body.text,
      addedBy: req.user._id,
    });

    lead.activities.push({
      action: "Note Added",
      performedBy: req.user._id,
    });

    await lead.save();

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Public Lead Submission
exports.publicCreateLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      budgetRange,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !budgetRange ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      budgetRange,
      message,
      status: "New",
      activities: [],
      notes: [],
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};