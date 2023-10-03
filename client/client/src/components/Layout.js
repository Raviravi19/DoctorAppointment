import React from "react";
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';
import '../styles/LayoutStyles.css';
import {  adminMenu } from './../Data/data';
import { Usermenu } from './../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import NotificationPage from "../pages/NotificationPage";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };

  //======doctor menu ========
  const doctormenu = [
    {
        name:'Home',
        path:'/',
        icon: " fa-solid fa-house",
    },
    {
        name:'Appointments',
        path:"/appointments",
        icon:"fa-solid fa-list",
    },
    {
        name:'Apply Doctor',
        path:'/apply-doctor',
        icon: "fa-solid fa-user-doctor",
    },
    {
        name:'Profile',
        path:`/doctor/profile/${user && user._id}`,
        icon: "fa-solid fa-user",
    },
  ];
  //======doctor menu ========
  const isAdmin = user && user.isAdmin;
  console.log(user);
  const SidebarMenu = isAdmin 
  ? adminMenu 
  : user && user.isDoctor
  ? doctormenu
  : Usermenu


  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOCTOR APP</h6>
          </div>
          <hr />

          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && 'active'}`} key={menu.path}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
          </div>

          <div className="menu-item" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <Link to="/login">Logout</Link>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="header-content" style={{ cursor: "pointer"}}>
              <Badge count={ user && user.notification.length} onClick={() => {navigate('/notification')}}>

                <i className="fa-solid fa-bell"></i>
              </Badge>
              {user && <Link to="/profile">{user.name}</Link>}
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
