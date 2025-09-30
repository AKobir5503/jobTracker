import { useState } from "react";
import JobList from "./JobList";
import AddJobForm from "./AddJobForm";

function App() {
  const [jobs, setJobs] = useState([]);

  const handleJobAdded = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  return (
    <div>
      <h1>Job Tracker</h1>
      <AddJobForm onJobAdded={handleJobAdded} />
      <JobList />
    </div>
  );
}

export default App;
