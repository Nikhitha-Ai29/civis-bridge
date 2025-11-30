/**
 * AI Summarization Service
 * Provides local extractive text summarization using word frequency analysis
 */

class SummarizationService {
  /**
   * Local Extractive Summarization
   * Uses word frequency analysis to identify key sentences
   * @param {string} text - The text to summarize
   * @param {number} summaryRatio - Percentage of original to include (0-1)
   * @returns {string} The summarized text
   */
  static localSummarize(text, summaryRatio = 0.3) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    if (sentences.length === 0) return '';

    // Build word frequency map
    const words = text.toLowerCase().split(/\s+/);
    const wordFreq = {};
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^a-z0-9]/g, '');
      if (cleanWord.length > 3) {
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
      }
    });

    // Score sentences
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

    // Select top sentences
    const summaryLength = Math.max(2, Math.ceil(sentences.length * summaryRatio));
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, summaryLength)
      .sort((a, b) => a.index - b.index)
      .map(s => s.text);

    return topSentences.join(' ').trim();
  }
}

export default SummarizationService;

/**
 * Usage:
 * const summary = SummarizationService.localSummarize(reportText);
 */
