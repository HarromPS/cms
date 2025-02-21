import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../Components/StudentPageComponents/Navbar/Navbar";
import StudentHome from "../Pages/StudentHome/StudentHome";
// import ElectionRoutes from "./ElectionRoutes";
// import EventRequestForm from '../Components/events/EventRequestForm';
import Logout from "../Components/StudentPageComponents/StudentRoutes/Logout";
import ProtectedRoute from "../utils/ProtectedRoute";
// import EventsList from '../Components/events/EventsList';
import MyComplaints from "../Components/StudentPageComponents/StudentRoutes/MyComplaints";
import RegisterComplaint from "../Components/StudentPageComponents/StudentRoutes/RegisterComplaint";
import PublicComplaints from "../Components/StudentPageComponents/StudentRoutes/PublicComplaints";

const StudentRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Route with Navbar */}
      <Route path="/" element={<Navbar><Outlet /></Navbar>}>
        {/* Dashboard - Only for students and admins */}
        <Route index element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentHome />
          </ProtectedRoute>
        } />

        {/* Student Complaints Routes */}
        <Route path="/my-complaints" element={<MyComplaints />} />

        {/* Registering any complaint */}
        <Route path="/register-complaint" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <RegisterComplaint />
          </ProtectedRoute>
        } />

        {/* Public Complaints */}
        <Route path="/public-complaints" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <PublicComplaints />
          </ProtectedRoute>
        } />

        {/* Create Event Request - Only for student coordinators */}
        <Route path="/logout" element={
          <ProtectedRoute allowedRoles={["student"]}>
            {/* <EventRequestForm /> */}
            <Logout />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
