const doctorModels = require("../models/doctorModels");
const appointmentModel = require("../models/appointmentModel");
const getDoctorInfoController = async (req,res) => {

    try {
        const doctor = await doctorModels.findOne({ userId: req.body.userId});
        res.status(200).send({
            success: true,
            message: "Doctor Appointments fetch successfully",
            data: doctor,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Fetching Doctor Details'
        })
    }
};

const updateProfileController =  async (req,res) => {
    try {
        const doctor = await doctorModels.findOneAndUpdate(
            {userId:req.body.userId}, 
            req.body 
            );
            res.status(201).send({
                success:true,
                message: "Doctor Profile Updated",
                data: doctor,
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Doctor Profile Update issue',
            error,
        });
    }
};

const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModels.findOne({_id: req.body.doctorId });
        res.status(200).send({
            success: true,
            message: "Single Doc Info Fetched",
            data: doctor,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Single doctor info'

        });
    }
};

const doctorAppointmentsController = async (req, res) => {
    try {
        
      const doctor = await doctorModels.findOne({ userId: req.body.userId });
      const appointments = await appointmentModel.find({
        doctorId: doctor._id,
      });

     console.log(appointments)
      res.status(200).send({
        success: true,
        message: "Doctor Appointments fetch Successfully",
        data: appointments,
      });
     
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Doc Appointments",
      });
    }
  };

  
const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notifcation = user.notifcation;
      notifcation.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  };
 
 module.exports = { 
    getDoctorInfoController,
      updateProfileController,
      getDoctorByIdController,
      doctorAppointmentsController,
      updateStatusController
    };