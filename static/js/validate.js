// Global variables
let highlightWords = [];
let challengeData = {}; // Initialize challengeData

// Function to fetch challenge data
async function fetchChallengeData() {
    try {
        const response = await fetch('/challenges/data/get_challenge_data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        challengeData = await response.json(); // Store the fetched challenge data
        updateChallengeUI(challengeData); // Update UI with challenge data
    } catch (error) {
        console.error('Error fetching challenge data:', error);
        showChallengeError();
    }
}

// Function to update UI with challenge data
function updateChallengeUI(data) {
    const challengeIdDiv = document.getElementById('challengeIdDiv');
    const challengeDescriptor = document.getElementById('challenge_descriptor');
    const hintContentDiv = document.getElementById('hint-content');

    if (challengeIdDiv) {
        challengeIdDiv.innerText = data.challenge_id || 'No ID available';
    }
    if (challengeDescriptor) {
        challengeDescriptor.innerHTML = data.description || 'No description available';
    }
    if (hintContentDiv) {
        hintContentDiv.innerHTML = data.challenge_hint || 'No hint available';
    }
}

// Function to handle challenge data fetch error
function showChallengeError() {
    const challengeDescriptor = document.getElementById('challenge_descriptor');
    const hintContentDiv = document.getElementById('hint-content');

    if (challengeDescriptor) {
        challengeDescriptor.innerHTML = '<p>Error fetching challenge data.</p>';
    }
    if (hintContentDiv) {
        hintContentDiv.innerHTML = '<p>Error fetching hint.</p>';
    }
}

// Function to fetch highlight words from the server
// async function fetchHighlightWords() {
//     try {
//         const response = await fetch('/get_highlight_words');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         highlightWords = await response.json();
//         console.log('Fetched Highlight Words:', highlightWords); // Debugging line
//     } catch (error) {
//         console.error('Error fetching highlight words:', error);
//     }
// }



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

// Function to count words
function countWords(text) {
    if (!text) {
        return 0; // Return 0 if text is undefined or null
    }
    return text.trim().split(/\s+/).filter(Boolean).length;
}

// Function to validate user input
async function validateInput() {
    const userInput = document.getElementById('user_validate')?.innerText || ''; // Use innerText for contenteditable
    const summaryHere = document.getElementById('summary_here');

    const wordCount = countWords(userInput);
    if (summaryHere) {
        summaryHere.innerHTML = `<p>Word count: ${wordCount}</p>`;
    }

    if (userInput.trim() !== '') {
        // Compare user input with the answer in challengeData
        const correctAnswer = challengeData.answer;
        const challengeId = challengeData.challenge_id;

        // Debugging logs
        console.log('Challenge ID from Data:', challengeId);
        console.log('User Input:', userInput);
        console.log('Correct Answer from Data:', correctAnswer);

        const isValid = userInput.trim() === correctAnswer.trim();
        handleValidationResult({ valid: isValid, answer: correctAnswer });
    } else {
        const resultDiv = document.getElementById('result_here');
        if (resultDiv) {
            resultDiv.innerHTML = '';
        }
    }
}
// Function to handle validation result
function handleValidationResult(result) {
    const resultDiv = document.getElementById('result_here');
    if (resultDiv) {
        if (result.valid) {
            resultDiv.innerHTML = '<p class="text-success">Correct!</p>';
        } else {
            if (result.answer) {
                const formattedAnswer = formatTextWithHighlights(result.answer);
                resultDiv.innerHTML = `<p class="text-danger">Incorrect. The correct answer is: ${formattedAnswer}</p>`;
            } else {
                resultDiv.innerHTML = '<p class="text-danger">Incorrect. The correct answer is not available.</p>';
            }
        }
    } else {
        console.error('Element with id "result_here" not found.');
    }
}

// Initialize and set up event listeners
document.addEventListener('DOMContentLoaded', async function() {
    await fetchChallengeData(); // Ensure challenge data is fetched
    // await fetchHighlightWords(); // Ensure highlight words are fetched

    const userValidateInput = document.getElementById('user_validate');
    if (userValidateInput) {
        userValidateInput.addEventListener('input', validateInput);
    } else {
        console.error('Element with id "user_validate" not found.');
    }
});
