import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React from "react";
import './index.css';
import ApplyDoctor from "./pages/ApplyDoctor ";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import Users1 from "./pages/admin/Users1";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointment";
//import { Switch } from "antd";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route path="/login"element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/apply-doctor" element={<ApplyDoctor />} />

        <Route
          path="/admin/Users"
          element={
            <ProtectedRoute>
              <Users1 />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/doctors" element={<Doctors /> } />
          <Route 
          path="/doctor/profile"
          element={
            <ProtectedRoute>
          <Profile />  
          </ProtectedRoute>
          } 
          />
    
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
          <Route
          path="/doctor-appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
          <Route
          path="/doctor/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
              < BookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
