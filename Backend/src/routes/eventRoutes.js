const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Get all complaints (filtered by role)
router.get('/get-all-complaints/', 
  verifyToken, 
  eventController.getAllComplaints
);

// Get approved complaints (filtered by role)
router.get('/get-approved-complaints/', 
  verifyToken, 
  eventController.getApprovedComplaints
);

// Get flagged complaints (filtered by role)
router.get('/get-flagged-complaints/', 
  verifyToken, 
  eventController.getFlaggedComplaints
);

// Get a users complaints (filtered by role)
router.get('/get-user-complaints/:id', 
  verifyToken, 
  eventController.getUserComplaints
);

// register a complaint
router.post('/register-complaint/:id', 
  verifyToken, 
  authorizeRoles('student'), 
  eventController.RegisterComplaint
);

module.exports = router; 