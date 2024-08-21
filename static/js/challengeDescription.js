document.addEventListener('DOMContentLoaded', function() {
    const challengeDiv = document.getElementById('challenge_descriptor');

    // Load the challenge description on page load
    fetch('/get_challenge_description')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.challengeDescription) {
                challengeDiv.innerHTML = `<p>${data.challengeDescription}</p>`;
            } else {
                console.error('Challenge description data is missing.');
            }
        })
        .catch(error => console.error('Error fetching challenge description:', error));
});
