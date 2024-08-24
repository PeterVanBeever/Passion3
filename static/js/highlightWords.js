// highlightValidate.js

// Global variables for highlight words
let highlightWords = [];

// Function to fetch highlight words from the server
async function fetchHighlightWords() {
    if (highlightWords.length === 0) {  // Only fetch if highlightWords is empty
        try {
            const response = await fetch('/highlight/get_highlight_words');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            highlightWords = await response.json();
            console.log('Fetched Highlight Words:', highlightWords); // Debugging line
        } catch (error) {
            console.error('Error fetching highlight words:', error);
        }
    }
}

// Function to format text with highlight words
function formatTextWithHighlights(text) {
    console.log('Original Text:', text); // Debugging line
    console.log('Highlight Words:', highlightWords); // Debugging line

    function replaceFunc(match) {
        console.log('Match:', match); // Debugging line
        const word = match;
        return highlightWords.includes(word.toLowerCase())
            ? `<span class='sql-blue'>${word}</span>`
            : word;
    }

    const pattern = new RegExp(`\\b(${highlightWords.join('|')})\\b`, 'gi');
    return text.replace(pattern, replaceFunc);
}

// Export the necessary functions for use in other files
export { fetchHighlightWords, formatTextWithHighlights };
