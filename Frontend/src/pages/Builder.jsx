import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export default function Builder() {
  const { id } = useParams(); // resumeId
  const { getToken } = useAuth();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = await getToken();

        const res = await axios.get(
          `http://localhost:5000/api/v1/resumes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setResume(res.data);
      } catch (err) {
        console.error("Failed to load resume:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, getToken]);

  if (loading) {
    return <div className="p-6">Loading resume…</div>;
  }

  if (!resume) {
    return <div className="p-6">Resume not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{resume.title}</h1>
      <p className="text-slate-500 mt-1">Template: {resume.templateSlug}</p>
    </div>
  );
}
