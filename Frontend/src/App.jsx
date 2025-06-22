import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/students/Students";
import Companies from "./pages/companies/Companies";
import Jobs from "./pages/jobs/Jobs";
import Profile from "./pages/profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import ChatPage from "./components/ChatPage";

import ApplicationsPage from "./pages/applicationpage/ApplicationsPage";
import ApplicationsPageCompany from "./pages/applicationpage/ApplicationsPagecompany";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/company-applications" element={<ApplicationsPageCompany />} />
              <Route path="/chat" element={<ChatPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
