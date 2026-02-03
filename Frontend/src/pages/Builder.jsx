import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

import BuilderContainer from "../resumeBuilder/BuilderContainer";

export default function Builder() {
  const { resumeId } = useParams(); // ✅ ONLY this
  const { getToken } = useAuth();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getToken();
        if (!token) throw new Error("No auth token");

        const res = await axios.get(
          `http://localhost:5000/api/v1/resumes/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setResume(res.data);
      } catch (err) {
        console.error("Failed to load resume:", err);
        setError("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId, getToken]); // ✅ correct dependency

  /* -------------------- UI States -------------------- */

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-600">
        Loading resume…
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Resume not found
      </div>
    );
  }

  /* -------------------- Builder -------------------- */

  return <BuilderContainer resume={resume} />;
}
