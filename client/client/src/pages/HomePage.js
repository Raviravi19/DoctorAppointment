import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "antd";
import DoctorsList from "../components/DoctorsList";
import doc7 from "../styles/doc7.jpg"

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout>
      <h1 className="text-center   ">Home Page</h1>
      <div className="bg-cover h-full w-full" style={{ backgroundImage: `url(${doc7})` }}>

      <Row>
        {/* Render the doctors */}
        { doctors && doctors.map((doctor) => (
          <DoctorsList doctor={doctor} />
          ))}
      </Row>
          </div>
    </Layout>
  );
};

export default HomePage;

