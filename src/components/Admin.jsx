import React, { useState } from 'react';
import '../styles/Admin.css';

function Admin() {
  const [users] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@civisbridge.com',
      role: 'Admin',
      status: 'Active',
      actions: [],
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@gov.com',
      role: 'Politician',
      status: 'Pending Approval',
      actions: ['Approve', 'Reject'],
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john.smith@moderators.com',
      role: 'Moderator',
      status: 'Active',
      actions: ['Suspend'],
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alice.j@email.com',
      role: 'Citizen',
      status: 'Active',
      actions: ['Suspend'],
    },
    {
      id: 5,
      name: 'Bob Williams',
      email: 'bob.w@email.com',
      role: 'Citizen',
      status: 'Suspended',
      actions: ['Unsuspend'],
    },
    {
      id: 6,
      name: 'Charlie Brown',
      email: 'charlie.b@email.com',
      role: 'Citizen',
      status: 'Active',
      actions: ['Suspend'],
    },
  ]);

  const stats = [
    { label: 'Total Users', value: '6', icon: '👥' },
    { label: 'Issues Reported', value: '5', icon: '📋' },
    { label: 'Resolution Rate', value: '20.0%', icon: '📈' },
    { label: 'Active Moderators', value: '1', icon: '🛡️' },
  ];

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="admin">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p className="subtitle">Manage users, content, and system settings.</p>
      </div>

      <div className="admin-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-box">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-icon">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="admin-sections">
        <div className="section-tabs">
          <button className="tab-btn active">👥 User Management</button>
          <button className="tab-btn">🚩 Flagged Content</button>
          <button className="tab-btn">⚙️ System Settings</button>
        </div>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">
                  <div className="user-avatar">{user.name.charAt(0)}</div>
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td className="role-tag">{user.role}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="action-buttons">
                  {user.actions.length > 0 ? (
                    user.actions.map((action, idx) => (
                      <button key={idx} className={`action-btn ${action.toLowerCase()}`}>
                        {action}
                      </button>
                    ))
                  ) : (
                    <span className="no-action">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
