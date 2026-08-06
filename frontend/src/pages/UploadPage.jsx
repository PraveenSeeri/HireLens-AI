import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaSpinner,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { uploadResume } from "../api/resumeApi";

function UploadPage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function validateFile(file) {
    if (!file) return false;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5 MB.");
      return false;
    }

    return true;
  }

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!validateFile(file)) return;

    setSelectedFile(file);
  }

  function handleDrop(event) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (!validateFile(file)) return;

    setSelectedFile(file);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  async function handleUpload() {
    if (!selectedFile) {
      toast.error("Please choose a resume first.");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadResume(selectedFile);

      toast.success("Resume analyzed successfully!");

      navigate("/analysis", {
        state: {
          analysis: result.resume_review,
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "Resume upload failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-6 transition-colors">

      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-10">

          <FaCloudUploadAlt className="mx-auto text-7xl text-blue-600 mb-5" />

          <h1 className="text-4xl font-bold dark:text-white">
            Upload Resume
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Drag & drop your resume or choose a PDF file.
          </p>

        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-blue-500 rounded-3xl p-12 text-center bg-blue-50 dark:bg-slate-800 transition"
        >

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mb-6"
          />

          {!selectedFile && (
            <>
              <FaCloudUploadAlt className="mx-auto text-6xl text-blue-500 mb-5" />

              <h2 className="text-xl font-semibold dark:text-white">
                Drop your resume here
              </h2>

              <p className="text-gray-500 mt-2">
                PDF • Maximum 5 MB
              </p>
            </>
          )}

          {selectedFile && (
            <div className="space-y-4">

              <FaFilePdf className="mx-auto text-red-500 text-6xl" />

              <h2 className="font-bold text-xl dark:text-white">
                {selectedFile.name}
              </h2>

              <p className="text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>

            </div>
          )}

        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-60 flex items-center justify-center gap-3"
        >

          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            "Upload & Analyze Resume"
          )}

        </button>

      </div>

    </div>
  );
}

export default UploadPage;