/**
 * Utility function to calculate the estimated reading time of a given text.
 * Based on an average reading speed of 200 words per minute.
 * 
 * @param {string} text - The content to analyze.
 * @returns {number} - The estimated minutes to read the text, rounded up.
 */
export const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    // Split text by whitespace to count words
    const noOfWords = text.split(/\s/g).length;
    // Calculate fractional minutes
    const minutes = noOfWords / wordsPerMinute;
    // Round up to the nearest whole minute
    const readTime = Math.ceil(minutes);
    return readTime;
};
