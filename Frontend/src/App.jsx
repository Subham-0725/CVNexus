import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20 bg-white">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />

          {/* Public-only (logged OUT only) */}
          <Route
            path="/sign-in/*"
            element={
              <PublicOnlyRoute>
                <SignInPage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/sign-up/*"
            element={
              <PublicOnlyRoute>
                <SignUpPage />
              </PublicOnlyRoute>
            }
          />

          {/* Protected (logged IN only) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
