import React, { useState } from 'react';
import '../styles/Dashboard.css';
import ReportIssueModal from './ReportIssueModal';

function Dashboard({ issues = [], onAddIssue }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const latestUpdates = [
    {
      id: 1,
      title: 'Main Street Pothole Repair Scheduled',
      author: 'Rep. Jane Doe',
      date: '1 day ago',
      icon: '🔧',
    },
    {
      id: 2,
      title: 'New Playground Equipment for Central Park',
      author: 'Mayor John Smith',
      date: '5 days ago',
      icon: '🎪',
    },
    {
      id: 3,
      title: 'Weekly Town Hall Meeting',
      author: 'Rep. Jane Doe',
      date: '1 week ago',
      icon: '📣',
    },
  ];

  const stats = [
    {
      title: 'Total Issues Reported',
      value: (1245 + issues.length - 4).toString(),
      change: '+15% from last month',
      icon: '📋',
    },
    {
      title: 'Issues Resolved',
      value: '980',
      change: '+20.1% from last month',
      icon: '✅',
    },
    {
      title: 'Avg. Resolution Time',
      value: '5.2 Days',
      change: '-2% from last month',
      icon: '⏱️',
    },
  ];

  const handleReportIssue = (newIssue) => {
    onAddIssue(newIssue);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <ReportIssueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleReportIssue}
      />

      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <input type="text" placeholder="Search issues, updates..." className="search-box" />
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3>{stat.title}</h3>
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-change">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="report-section">
        <div className="report-card">
          <h3>Report a New Issue</h3>
          <p>Found a problem in your community? Let us know.</p>
          <button className="report-button" onClick={handleOpenModal}>Report Now</button>
        </div>
      </div>

      <div className="content-grid">
        <div className="trending-section">
          <h3>Trending Issues</h3>
          <p className="section-subtitle">The most upvoted issues from your community.</p>
          <div className="issues-list">
            {issues.map((issue) => (
              <div key={issue.id} className="issue-item">
                <div className="issue-votes">{issue.votes}</div>
                <div className="issue-content">
                  <h4>{issue.title}</h4>
                  <p>Reported by {issue.reporter} • {issue.date}</p>
                </div>
                <span className={`status-badge ${issue.status.toLowerCase().replace(' ', '-')}`}>
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
          <button className="view-all-btn">View All Issues</button>
        </div>

        <div className="updates-section">
          <h3>Latest Updates</h3>
          <p className="section-subtitle">Announcements from your elected representatives.</p>
          <div className="updates-list">
            {latestUpdates.map((update) => (
              <div key={update.id} className="update-item">
                <div className="update-icon">{update.icon}</div>
                <div className="update-content">
                  <h4>{update.title}</h4>
                  <p>{update.author} • {update.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn">View All Updates</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
