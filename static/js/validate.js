// Global variable to store the fetched challenge data
let highlightWords = [];


// Function to fetch challenge data
document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_challenge_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            challengeData = data; // Store the fetched challenge data
            const challengeIdDiv = document.getElementById('challengeIdDiv');
            const challengeDescriptor = document.getElementById('challenge_descriptor');
            const hintContentDiv = document.getElementById('hint-content');

            // Ensure the elements exist before trying to set their content
            if (challengeIdDiv) {
                challengeIdDiv.innerText = data.challenge_id || 'No ID available';
            }
            if (challengeDescriptor) {
                challengeDescriptor.innerHTML = data.description || 'No description available';
            }
            if (hintContentDiv) {
                hintContentDiv.innerHTML = data.challenge_hint || 'No hint available';
            }
        })
        .catch(error => {
            console.error('Error fetching challenge data:', error);
            const challengeDescriptor = document.getElementById('challenge_descriptor');
            const hintContentDiv = document.getElementById('hint-content');

            if (challengeDescriptor) {
                challengeDescriptor.innerHTML = '<p>Error fetching challenge data.</p>';
            }
            if (hintContentDiv) {
                hintContentDiv.innerHTML = '<p>Error fetching hint.</p>';
            }
        });
});

// Function to format text with highlight words
function formatTextWithHighlights(text, highlightWords) {
    console.log('Original Text:', text); // Debugging line
    console.log('Highlight Words:', highlightWords); // Debugging line

    function replaceFunc(match, offset, string) {
        console.log('Match:', match); // Debugging line
        if (!match || !match[0]) {
            return ''; // Return empty if match or match[0] is undefined
        }
        
        const word = match[0];
        return highlightWords.includes(word.toLowerCase())
            ? `<span class='sql-blue'>${word}</span>`
            : word;
    }

    // Use regex to match highlight words
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

async function validateInput() {
    const userInput = document.getElementById('user_validate')?.innerText || ''; // Use innerText for contenteditable
    const summaryHere = document.getElementById('summary_here');

    const wordCount = countWords(userInput);
    if (summaryHere) {
        summaryHere.innerHTML = `<p>Word count: ${wordCount}</p>`;
    }

    if (userInput.trim() !== '') {
        try {
            const response = await fetch('/validate_input', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: userInput, challenge: challengeData })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            handleValidationResult(result);
        } catch (error) {
            console.error('Error validating input:', error);
        }
    } else {
        const resultDiv = document.getElementById('result_here');
        if (resultDiv) {
            resultDiv.innerHTML = '';
        }
    }
}

// Function to handle the validation result
function handleValidationResult(result) {
    const resultDiv = document.getElementById('result_here');
    if (resultDiv) {
        if (result.valid) {
            resultDiv.innerHTML = '<p class="text-success">Correct!</p>';
        } else {
            // Check if result.answer is present and format it
            if (result.answer) {
                const formattedAnswer = formatTextWithHighlights(result.answer, highlightWords);
                resultDiv.innerHTML = `<p class="text-danger">Incorrect. The correct answer is: ${formattedAnswer}</p>`;
            } else {
                resultDiv.innerHTML = '<p class="text-danger">Incorrect. The correct answer is not available.</p>';
            }
        }
    } else {
        console.error('Element with id "result_here" not found.');
    }
}



// Add event listener for input validation
const userValidateInput = document.getElementById('user_validate');
if (userValidateInput) {
    userValidateInput.addEventListener('input', validateInput);
} else {
    console.error('Element with id "user_validate" not found.');
}
