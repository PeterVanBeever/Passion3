// Global variable to store the fetched challenge data
let challengeData = {};

// Event listener for DOMContentLoaded to fetch challenge data
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
