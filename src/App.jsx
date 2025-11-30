import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IssueTracker from './components/IssueTracker';
import Updates from './components/Updates';
import MapView from './components/MapView';
import ReportSummarizer from './components/ReportSummarizer';
import Admin from './components/Admin';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import { getCurrentUser, logout as authLogout } from './utils/auth';

function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [activePage, setActivePage] = useState(currentUser ? 'dashboard' : 'login');
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: 'Large pothole on Main Street',
      reporter: 'Alice Johnson',
      reported: '3 days ago',
      upvotes: 128,
      status: 'In Progress',
      category: 'Roads',
      location: 'Main Street & 5th Ave',
      email: 'alice@example.com'
    },
    {
      id: 2,
      title: 'Streetlight out at Elm & 2nd',
      reporter: 'Bob Williams',
      reported: '8 days ago',
      upvotes: 45,
      status: 'Submitted',
      category: 'Public Safety',
      location: 'Elm Street & 2nd Avenue',
      email: 'bob@example.com'
    },
    {
      id: 3,
      title: 'Broken swing at Central Park',
      reporter: 'Charlie Brown',
      reported: '2 weeks ago',
      upvotes: 72,
      status: 'Resolved',
      category: 'Parks',
      location: 'Central Park',
      email: 'charlie@example.com'
    },
    {
      id: 4,
      title: 'Leaking fire hydrant on Pine St',
      reporter: 'Diana Prince',
      reported: '1 day ago',
      upvotes: 91,
      status: 'Submitted',
      category: 'Water Supply',
      location: 'Pine Street',
      email: 'diana@example.com'
    },
  ]);

  const handleAddIssue = (newIssue) => {
    setIssues(prev => [newIssue, ...prev]);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard issues={issues} onAddIssue={handleAddIssue} />;
      case 'login':
        return <Login onLogin={(user) => { setCurrentUser(user); setActivePage('dashboard'); }} onNavigate={setActivePage} />;
      case 'register':
        return <RegisterPage onNavigate={setActivePage} />;
      case 'issue-tracker':
        return <IssueTracker issues={issues} />;
      case 'updates':
        return <Updates />;
      case 'map-view':
        return <MapView />;
      case 'report-summarizer':
        return <ReportSummarizer />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard issues={issues} onAddIssue={handleAddIssue} />;
    }
  };

  return (
    <div className="app">
      {/* Hide sidebar on auth screens */}
      {!(activePage === 'login' || activePage === 'register') && (
        <Sidebar active={activePage} onNavigate={setActivePage} currentUser={currentUser} onLogout={() => { authLogout(); setCurrentUser(null); setActivePage('login'); }} />
      )}
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
