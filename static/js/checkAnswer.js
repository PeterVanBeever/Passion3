document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById('stars-container');
    const userInput = document.getElementById('user_validate');

    // Correct answer defined
    const correctAnswer = "SELECT * FROM persons WHERE name = 'Peter';";

    // Function to render stars
    function renderStars(rating) {
        starsContainer.innerHTML = ""; // Clear existing stars

        const filledStar = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>`;

        const unfilledStar = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>`;

        // Add filled stars
        for (let i = 0; i < rating; i++) {
            starsContainer.innerHTML += filledStar;
        }

        // Add unfilled stars
        for (let i = rating; i < 5; i++) {
            starsContainer.innerHTML += unfilledStar;
        }
    }

    // Function to check the user's answer
    function checkAnswer() {
        let userAnswer = userInput.textContent.trim().toUpperCase();

        // Normalize spaces and remove punctuation, but keep special characters
        userAnswer = userAnswer.replace(/[^\w\s*'";=]/g, '').replace(/\s+/g, ' ');

        // Convert answer to word arrays
        const correctWords = correctAnswer.toUpperCase().split(/\s+/).filter(word => word.length > 0);
        const userWords = userAnswer.toUpperCase().split(/\s+/).filter(word => word.length > 0);

        // Create a Set for fast lookup
        const correctWordsSet = new Set(correctWords);
         // Log the words in the Set
        console.log('Correct Words Set:', [...correctWordsSet]);

        // Check for exact match for full rating
    if (userAnswer === correctAnswer.toUpperCase()) {
        renderYellowStars();
        console.log('Exact match! Rating: 5');
        return;
    }
    
    // Function to render all stars as yellow
    function renderYellowStars() {
        starsContainer.innerHTML = ""; // Clear existing stars

        const filledStar = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>`;

        // Add five yellow stars
        for (let i = 0; i < 5; i++) {
            starsContainer.innerHTML += filledStar;
        }
    }


    // Count matching words
    let matchedWords = 0;
    userWords.forEach(word => {
        if (correctWordsSet.has(word)) {
            matchedWords++;
            correctWordsSet.delete(word); // Ensure each word is only counted once
        }
    });

    // Calculate partial rating
    const totalWords = correctWords.length;
    let rating = Math.floor((matchedWords / totalWords) * 5); // Use Math.floor to round down

    // Ensure rating is between 0 and 5 
    rating = Math.max(0, Math.min(rating, 5));

    renderStars(rating);
    }

    // Event listener for input changes
    userInput.addEventListener('input', checkAnswer);

    // Initial rendering of unfilled stars
    renderStars(0);
});
