import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from "moment";
import doc7 from "../styles/doc7.jpg"

const BookingPage = () => {
  const { user }  = useSelector(state => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const dispatch = useDispatch();

  const getDoctorById = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } 
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/book-appointment", {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctor,
        date: date,
        userInfo: user,
        time: time,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // const checkAvailability = () => {
  //   // Perform availability check logic here
  //   // You can use the selectedDate and selectedTimings state values to check for availability
  //   // Update the isAvailable state based on the availability check result
  //   setIsAvailable(true); // Placeholder value, replace with actual availability check logic
  // };
const handleAvailability = async () => {
  try {
    dispatch(showLoading())
    const res = await axios.post('/api/v1/user/booking-availability', 
    {doctorId: params.doctorId, date,time},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }
    );
    dispatch(hideLoading());
    if(res.data.success){
      setIsAvailable(true)
      message.success(res.data.message)
    }else{
      message.error(res.data.message)
    }
  } catch (error) {
    dispatch(hideLoading())
    console.log(error)
  }
}
  useEffect(() => {
    getDoctorById();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout >
      <h3>BookingPage</h3>
      {/* <div className="flex flex-row	"> */}

      <div className="container m-2 bg-slate-800 " >
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees: {doctor.feesPerCunsaltation}</h4>
            {doctor.timings && (
              <h4>
                Timings: {doctor.timings[0]} - {doctor.timings[1]}
              </h4>
            )}
            
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => 
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
            <TimePicker
               format="HH:mm"
             className="m-2"
            onChange={(value) => {
           setTime(moment(value).format("HH:mm"));
             }}
            />

              <button className="btn btn-primary m-2" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>Book Now</button>
              {! isAvailable && <p>Available for booking</p>}
            </div>
          </div>
        )}
      </div>
      <div className="bg-cover h-full w-full" style={{ backgroundImage: `url(${doc7})` }}>

      </div> 

    </Layout>
  );
};

export default BookingPage;
