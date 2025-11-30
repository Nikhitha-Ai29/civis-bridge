import React from 'react';
import '../styles/IssueTracker.css';

function IssueTracker({ issues = [] }) {

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="issue-tracker">
      <div className="tracker-header">
        <h2>Issue Tracker</h2>
        <p className="subtitle">Create and manage all issues reported by citizens.</p>
        <div className="tracker-controls">
          <button className="filter-btn">🔍 Filter</button>
          <button className="report-btn">📝 Report Issue</button>
        </div>
      </div>

      <div className="issues-table-wrapper">
        <table className="issues-table">
          <thead>
            <tr>
              <th>Issue</th>
              <th>Status</th>
              <th>Category</th>
              <th>Upvotes</th>
              <th>Reported</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td className="issue-title">{issue.title}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(issue.status)}`}>
                    {issue.status}
                  </span>
                </td>
                <td className="category-tag">{issue.category}</td>
                <td className="upvotes">
                  <span className="upvote-count">{issue.upvotes}</span>
                </td>
                <td>{issue.reported}</td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssueTracker;
