import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginSignupPage from "./Pages/LoginSignupPages/LoginSignupPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import StudentHome from "./Pages/StudentHome/StudentHome";
import AdminHome from "./Pages/AdminHome/AdminHome";
import BoardMemberRoutes from "./routes/AdminRoutes";
// import DoctorHome from "./Pages/DoctorHome/DoctorHome";
import { AuthProvider } from "./contexts/AuthContext";
import UnauthorizedPage from "./Components/common/UnauthorizedPage";
import StudentRoutes from "./routes/StudentRoutes";

// Remove or comment out these imports until you create the components
// import Navbar from './components/common/Navbar';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["student", "board-member"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentHome />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentRoutes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/board-member"
            element={
              <ProtectedRoute allowedRoles={["board-member"]}>
                <AdminHome />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/board-member/*"
            element={
              <ProtectedRoute allowedRoles={["board-member"]}>
                <BoardMemberRoutes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
