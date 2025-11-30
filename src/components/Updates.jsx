import React from 'react';
import '../styles/Updates.css';

function Updates() {
  const updates = [
    {
      id: 1,
      title: 'Main Street Pothole Repair Scheduled',
      author: 'Rep. Jane Doe',
      role: 'City Council',
      date: '1 day ago',
      content: 'We have received numerous reports about the large pothole on Main Street. A repair crew has been scheduled for this Friday. Thank you for your patience.',
    },
    {
      id: 2,
      title: 'New Playground Equipment for Central Park',
      author: 'Mayor John Smith',
      role: 'Mayor\'s Office',
      date: '3 days ago',
      content: 'Following feedback from the community, we have approved funding for new playground equipment at Central Park, including new swings. Installation is expected to begin next month.',
    },
    {
      id: 3,
      title: 'Weekly Town Hall Meeting',
      author: 'Rep. Jane Doe',
      role: 'City Council',
      date: '1 week ago',
      content: 'Join us this Wednesday at 7 PM for our weekly virtual town hall. We will be discussing the new city budget and taking your questions.',
    },
  ];

  return (
    <div className="updates">
      <div className="updates-header">
        <h2>Community Updates</h2>
        <p className="subtitle">Announcements and progress reports from your representatives.</p>
      </div>

      <div className="updates-container">
        {updates.map((update) => (
          <div key={update.id} className="update-card">
            <div className="update-card-header">
              <div className="update-author">
                <div className="author-avatar">{update.author.charAt(0)}</div>
                <div className="author-info">
                  <h3>{update.title}</h3>
                  <p className="author-details">
                    Posted by {update.author} ({update.role}) • {update.date}
                  </p>
                </div>
              </div>
            </div>
            <div className="update-card-body">
              <p>{update.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Updates;
