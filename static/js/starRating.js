// starRating.js

// Utility function to compare two strings
function calculateSimilarity(userAnswer, correctAnswer) {
    const userWords = userAnswer.trim().split(/\s+/);
    const correctWords = correctAnswer.trim().split(/\s+/);

    let matchingWords = 0;
    const maxWords = Math.max(userWords.length, correctWords.length);

    userWords.forEach((word, index) => {
        if (correctWords[index] && word.toLowerCase() === correctWords[index].toLowerCase()) {
            matchingWords++;
        }
    });

    return (matchingWords / maxWords) * 100; // Return percentage of matching words
}

// Function to update star rating
function updateStarRating(percentage) {
    const stars = document.querySelectorAll("#stars-container svg");

    stars.forEach((star, index) => {
        if (percentage >= (index + 1) * 20) {
            star.classList.add('bi-star-fill');
            star.classList.remove('bi-star');
        } else {
            star.classList.add('bi-star');
            star.classList.remove('bi-star-fill');
        }
    });
}

// Function to evaluate the user's answer and update stars
function evaluateAnswer() {
    const userAnswer = document.getElementById("user_validate").textContent;
    const correctAnswer = "SELECT * FROM table WHERE condition"; // Example correct answer

    const similarityPercentage = calculateSimilarity(userAnswer, correctAnswer);

    updateStarRating(similarityPercentage);
}

// Attach event listener to the contenteditable div
document.getElementById("user_validate").addEventListener("input", evaluateAnswer);
