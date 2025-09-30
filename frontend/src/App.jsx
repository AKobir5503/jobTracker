import React, { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");

  // Load jobs from backend
  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then(setJobs)
      .catch(console.error);
  }, []);

  // Add job
  const addJob = async (e) => {
    e.preventDefault();
    const newJob = { title, company, status };
    const res = await fetch("/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    const data = await res.json();
    setJobs([...jobs, data]);
    setTitle("");
    setCompany("");
    setStatus("applied");
  };

  // Delete job
  const deleteJob = async (id) => {
    await fetch(`/jobs/${id}`, { method: "DELETE" });
    setJobs(jobs.filter((j) => j.id !== id));
  };

  // Update job (toggle status between applied/interview/offer/rejected)
  const updateJob = async (id, newStatus) => {
    const job = jobs.find((j) => j.id === id);
    const updated = { ...job, status: newStatus };
    const res = await fetch(`/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    setJobs(jobs.map((j) => (j.id === id ? data : j)));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Job Tracker</h1>

      <form onSubmit={addJob} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginRight: "0.5rem" }}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map((job) => (
          <li key={job.id} style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
            <strong>{job.title}</strong> @ {job.company}  
            <span style={{ marginLeft: "1rem" }}>({job.status})</span>
            <div style={{ marginTop: "0.3rem" }}>
              <button onClick={() => deleteJob(job.id)} style={{ marginRight: "0.5rem" }}>Delete</button>
              <button onClick={() => updateJob(job.id, "interview")} style={{ marginRight: "0.5rem" }}>Set Interview</button>
              <button onClick={() => updateJob(job.id, "offer")} style={{ marginRight: "0.5rem" }}>Set Offer</button>
              <button onClick={() => updateJob(job.id, "rejected")}>Set Rejected</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
