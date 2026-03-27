import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UsersPage from "./pages/Users";
import UserDetailsPage from "./pages/UserDetails";



function App() {
  return (
    <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/users/:id" element={<UserDetailsPage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;