const EventRequest = require("../models/EventRequestModel.js");
const User = require("../models/usermodel.js");
const Complaint = require("../models/complaintModel.js");
const moderation = require("../utils/moderation.js");

/**
 * Event Controller
 * Handles all event-related operations
 */
const eventController = {
  // Create new event request
  getAllComplaints: async (req, res) => {
    try {
      const { 
        title,
        description,
        category,
        status,
        submitted_by,
        moderation_status,

      } = req.body;

      // Verify user is a student coordinator
      const coordinator = await Complaint.find({});
      

      const eventRequest = new EventRequest({
        eventName,
        eventType,
        date,
        venue,
        description,
        expectedAttendees,
        budget,
        organizerContact,
        coordinatorId: req.user.id
      });

      await eventRequest.save();
      res.status(201).json({ message: 'Event request created successfully', eventRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error creating event request', error: error.message });
    }
  },

  // Get all events (with optional filters)
  getApprovedComplaints: async (req, res) => {
    try {
      const { status, type } = req.query;
      let query = {};

      // Apply filters if provided
      if (status) query.status = status;
      if (type) query.eventType = type;

      // If user is a coordinator, only show their events
      if (req.user.role === 'student-coordinator') {
        query.coordinatorId = req.user.id;
      }

      const events = await EventRequest.find(query)
        .populate('coordinatorId', 'email')
        .sort({ createdAt: -1 });

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  },

  // Update event request status (admin only)
  getFlaggedComplaints: async (req, res) => {
    try {
      const { eventId } = req.params;
      const { status, adminComments } = req.body;

      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can update event status' });
      }

      const eventRequest = await EventRequest.findByIdAndUpdate(
        eventId,
        { status, adminComments },
        { new: true }
      );

      if (!eventRequest) {
        return res.status(404).json({ message: 'Event request not found' });
      }

      res.status(200).json({ message: 'Event status updated', eventRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error updating event status', error: error.message });
    }
  },

  // Get event details by ID
  getUserComplaints: async (req, res) => {
    try {
      const { userId } = req.params;
      const userComplaints = await Complaint.find({userId});
      if (userComplaints.length === 0) {
        return res.status(404).json({ message: "No Complaint Registered Yet!" });
      }

      res.status(200).json(userComplaints);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching event details', error: error.message });
    }
  },

  // Get event details by ID
  RegisterComplaint: async (req, res) => {
    try {
      const { userId } = req.params;
      const { 
        title,
        description,
        category,
        status,
        submitted_by,
        moderation_status,

      } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const checkAppropriateComplaint = moderation(description);
      moderation_status = checkAppropriateComplaint?"approved":"flagged";
      status = checkAppropriateComplaint?"public":"flagged";

      const newComplaint = new Complaint({
        title,
        description,
        category,
        status,
        submitted_by,
        moderation_status,
      });
      
      await newComplaint.save();
      res.status(200).json({"msg":"success"});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching event details', error: error.message });
    }
  }
};

module.exports = eventController; 