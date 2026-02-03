import { Routes, Route, useLocation } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import Builder from "./pages/Builder";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const location = useLocation();
  const isBuilderRoute = location.pathname.startsWith("/builder");

  return (
    <div className="min-h-screen bg-white">
      {/* Hide navbar on Builder for focused editing UX */}
      {!isBuilderRoute && <Navbar />}

      <main className={isBuilderRoute ? "" : "pt-20 bg-white"}>
        <Routes>
          {/* Root */}
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <LandingPage />
                </SignedOut>
              </>
            }
          />

          {/* Public pages */}
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth (public-only) */}
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

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/builder/:resumeId"
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
