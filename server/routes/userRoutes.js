const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllDoctorsController } = require("../controllers/adminCtrl");

// Router object
const router = express.Router();

// Routes
// LOGIN || POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);

router.post("/getUserData", authMiddleware, authController);

router.post("/get-all-notification", authMiddleware, getAllNotificationController);


router.post("/apply-doctor", authMiddleware, applyDoctorController);

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);


//Book Appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//Booking Availability
router.post(
  '/booking-availability',
  authMiddleware,
  bookingAvailabilityController,
  );

  //Appointments List 
  router.get('/user-appointments', authMiddleware,userAppointmentsController)
module.exports = router;
