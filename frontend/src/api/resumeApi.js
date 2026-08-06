import API from "./authApi";

/* ===========================
   Upload Resume
=========================== */

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/resume/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* ===========================
   Dashboard Statistics
=========================== */

export const getResumeStats = async () => {
  const response = await API.get(
    "/resume/stats"
  );

  return response.data;
};

/* ===========================
   Resume History
=========================== */

export const getResumeHistory = async () => {
  const response = await API.get(
    "/resume/history"
  );

  return response.data;
};

/* ===========================
   Get Resume by ID
=========================== */

export const getResumeById = async (
  resumeId
) => {
  const response = await API.get(
    `/resume/${resumeId}`
  );

  return response.data;
};

/* ===========================
   Delete Resume
=========================== */

export const deleteResume = async (
  resumeId
) => {
  const response = await API.delete(
    `/resume/${resumeId}`
  );

  return response.data;
};

/* ===========================
   Compare Two Stored Resumes
=========================== */

export const compareResumes = async (
  oldId,
  newId
) => {
  const response = await API.get(
    `/resume/compare/${oldId}/${newId}`
  );

  return response.data;
};

/* ===========================
   Compare Existing Resume
   with Newly Uploaded PDF
=========================== */

export const compareUploadedResume = async (
  resumeId,
  file
) => {
  const formData = new FormData();

  formData.append(
    "resume_id",
    resumeId
  );

  formData.append(
    "file",
    file
  );

  const response = await API.post(
    "/resume/compare-upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* ===========================
   AI Job Match
=========================== */

export const jobMatch = async (
  file,
  jobDescription
) => {
  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  formData.append(
    "job_description",
    jobDescription
  );

  const response = await API.post(
    "/resume/job-match",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export default API;