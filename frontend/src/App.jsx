import React, { useEffect, useState, useMemo } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedJobs, setSelectedJobs] = useState(new Set());

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
    setSelectedJobs(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // Update job status
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

  // Bulk delete selected jobs
  const bulkDelete = async () => {
    const deletePromises = Array.from(selectedJobs).map(id => 
      fetch(`/jobs/${id}`, { method: "DELETE" })
    );
    await Promise.all(deletePromises);
    setJobs(jobs.filter(j => !selectedJobs.has(j.id)));
    setSelectedJobs(new Set());
  };

  // Bulk update status
  const bulkUpdateStatus = async (newStatus) => {
    const updatePromises = Array.from(selectedJobs).map(id => {
      const job = jobs.find(j => j.id === id);
      const updated = { ...job, status: newStatus };
      return fetch(`/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    });
    await Promise.all(updatePromises);
    setJobs(jobs.map(j => 
      selectedJobs.has(j.id) ? { ...j, status: newStatus } : j
    ));
    setSelectedJobs(new Set());
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [jobs, searchTerm, statusFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "applied": return "#3b82f6";
      case "interview": return "#f59e0b";
      case "offer": return "#10b981";
      case "rejected": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const toggleJobSelection = (id) => {
    setSelectedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAllJobs = () => {
    if (selectedJobs.size === filteredAndSortedJobs.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(filteredAndSortedJobs.map(job => job.id)));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Job Tracker</h1>
        <p className="app-subtitle">Professional job application management</p>
      </header>

      <main className="app-main">
        <form onSubmit={addJob} className="job-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="form-input"
            />
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="form-select"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            <button type="submit" className="btn btn-primary">Add Job</button>
          </div>
        </form>

        <div className="jobs-section">
          <div className="jobs-header">
            <h2 className="jobs-title">Applications ({filteredAndSortedJobs.length})</h2>
            
            {/* Search and Filters */}
            <div className="filters-row">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedJobs.size > 0 && (
              <div className="bulk-actions">
                <span className="bulk-info">{selectedJobs.size} selected</span>
                <button 
                  onClick={() => bulkUpdateStatus("interview")} 
                  className="btn btn-sm btn-outline"
                >
                  Mark Interview
                </button>
                <button 
                  onClick={() => bulkUpdateStatus("offer")} 
                  className="btn btn-sm btn-outline"
                >
                  Mark Offer
                </button>
                <button 
                  onClick={() => bulkUpdateStatus("rejected")} 
                  className="btn btn-sm btn-outline"
                >
                  Mark Rejected
                </button>
                <button 
                  onClick={bulkDelete} 
                  className="btn btn-sm btn-danger"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {filteredAndSortedJobs.length === 0 ? (
            <div className="empty-state">
              <p>No job applications found. {searchTerm || statusFilter !== "all" ? "Try adjusting your filters." : "Add your first application above!"}</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="jobs-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectedJobs.size === filteredAndSortedJobs.length && filteredAndSortedJobs.length > 0}
                        onChange={selectAllJobs}
                        className="checkbox"
                      />
                    </th>
                    <th 
                      className="sortable" 
                      onClick={() => handleSort("title")}
                    >
                      Job Title {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th 
                      className="sortable" 
                      onClick={() => handleSort("company")}
                    >
                      Company {sortField === "company" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th 
                      className="sortable" 
                      onClick={() => handleSort("status")}
                    >
                      Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedJobs.map((job) => (
                    <tr key={job.id} className={selectedJobs.has(job.id) ? "selected" : ""}>
                      <td className="checkbox-col">
                        <input
                          type="checkbox"
                          checked={selectedJobs.has(job.id)}
                          onChange={() => toggleJobSelection(job.id)}
                          className="checkbox"
                        />
                      </td>
                      <td className="job-title-cell">
                        <strong>{job.title}</strong>
                      </td>
                      <td className="company-cell">{job.company}</td>
                      <td className="status-cell">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(job.status) }}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <div className="action-buttons">
                          <button 
                            onClick={() => updateJob(job.id, "interview")} 
                            className="btn btn-xs btn-outline"
                            title="Mark as Interview"
                          >
                            Interview
                          </button>
                          <button 
                            onClick={() => updateJob(job.id, "offer")} 
                            className="btn btn-xs btn-outline"
                            title="Mark as Offer"
                          >
                            Offer
                          </button>
                          <button 
                            onClick={() => updateJob(job.id, "rejected")} 
                            className="btn btn-xs btn-outline"
                            title="Mark as Rejected"
                          >
                            Rejected
                          </button>
                          <button 
                            onClick={() => deleteJob(job.id)} 
                            className="btn btn-xs btn-danger"
                            title="Delete Job"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
