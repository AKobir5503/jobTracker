import { useEffect, useState } from "react";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div>
      <h2>Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No jobs yet. Add one below!</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> at {job.company} — {job.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;
