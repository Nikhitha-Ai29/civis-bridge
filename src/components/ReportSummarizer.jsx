import React, { useState } from 'react';
import '../styles/ReportSummarizer.css';

function ReportSummarizer() {
  const [reportText, setReportText] = useState('');
  const [summary, setSummary] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // AI Summarization using extractive approach
  const generateSummary = (text) => {
    // Split text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    if (sentences.length === 0) return '';

    // Score sentences based on word frequency
    const words = text.toLowerCase().split(/\s+/);
    const wordFreq = {};
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^a-z0-9]/g, '');
      if (cleanWord.length > 3) {
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
      }
    });

    // Score each sentence
    const scoredSentences = sentences.map((sentence, index) => {
      const sentenceWords = sentence.toLowerCase().split(/\s+/);
      let score = 0;
      
      sentenceWords.forEach(word => {
        const cleanWord = word.replace(/[^a-z0-9]/g, '');
        score += wordFreq[cleanWord] || 0;
      });

      return {
        text: sentence.trim(),
        score: score / sentenceWords.length,
        index: index
      };
    });

    // Get top 30% of sentences and sort by original order
    const summaryLength = Math.max(2, Math.ceil(sentences.length * 0.3));
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, summaryLength)
      .sort((a, b) => a.index - b.index)
      .map(s => s.text);

    return topSentences.join(' ').trim();
  };

  const handleGenerateSummary = async () => {
    if (reportText.trim().length < 100) {
      setError('Please enter at least 100 characters');
      return;
    }

    setIsLoading(true);
    setError('');
    setCopySuccess(false);

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedSummary = generateSummary(reportText);
      
      if (generatedSummary) {
        setSummary(generatedSummary);
        setHasGenerated(true);
      } else {
        setError('Could not generate summary. Please try with different text.');
      }
    } catch (err) {
      setError('An error occurred while generating the summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleDownloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'report-summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareSummary = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Report Summary',
        text: summary
      });
    } else {
      alert('Share functionality is not supported on your browser');
    }
  };

  const handleClearAll = () => {
    setReportText('');
    setSummary('');
    setHasGenerated(false);
    setError('');
    setCopySuccess(false);
  };

  return (
    <div className="report-summarizer">
      <div className="summarizer-header">
        <h2>AI-Powered Report Summarizer</h2>
        <p className="subtitle">Convert lengthy government reports into concise, easy-to-understand summaries for citizens.</p>
      </div>

      <div className="summarizer-container">
        <div className="input-section">
          <div className="section-header">
            <h3>Government Report Text</h3>
            <span className="char-counter">
              {reportText.length} / 100+ characters
            </span>
          </div>
          <p className="input-hint">Paste the full text of the government report here...</p>
          <textarea
            className="report-input"
            placeholder="Paste the full text of the government report here..."
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            rows={12}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="input-controls">
            <button
              className="generate-btn"
              onClick={handleGenerateSummary}
              disabled={reportText.trim().length < 100 || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span> Generating...
                </>
              ) : (
                <>✨ Generate Summary</>
              )}
            </button>
            {reportText && (
              <button className="clear-btn" onClick={handleClearAll}>
                🗑️ Clear
              </button>
            )}
          </div>
        </div>

        <div className="output-section">
          <div className="section-header">
            <h3>AI-Powered Summary</h3>
            {hasGenerated && (
              <span className="summary-stats">
                {Math.round((summary.length / reportText.length) * 100)}% of original
              </span>
            )}
          </div>
          <div className="summary-output">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner-large"></div>
                <p>Analyzing and summarizing your report...</p>
              </div>
            ) : hasGenerated ? (
              <>
                <p>{summary}</p>
                <div className="summary-stats-detail">
                  <span>📝 {summary.split('.').length - 1} key sentences</span>
                  <span>📊 {Math.round(summary.length / 10)} words</span>
                </div>
              </>
            ) : (
              <p className="placeholder">
                A concise, easy-to-understand summary will appear here.
              </p>
            )}
          </div>
          {hasGenerated && !isLoading && (
            <div className="summary-actions">
              <button
                className={`action-btn copy-btn ${copySuccess ? 'success' : ''}`}
                onClick={handleCopySummary}
                title="Copy to clipboard"
              >
                {copySuccess ? '✓ Copied!' : '📋 Copy'}
              </button>
              <button
                className="action-btn download-btn"
                onClick={handleDownloadSummary}
                title="Download as text file"
              >
                📥 Download
              </button>
              <button
                className="action-btn share-btn"
                onClick={handleShareSummary}
                title="Share summary"
              >
                🔗 Share
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportSummarizer;
