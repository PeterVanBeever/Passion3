document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_challenge_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const challengeIdDiv = document.getElementById('challengeIdDiv');
            const challengeDescriptor = document.getElementById('challenge_descriptor');

            // Ensure the elements exist before trying to set their content
            if (challengeIdDiv) {
                challengeIdDiv.innerText = data.challenge_id || 'No ID available';
            }
            if (challengeDescriptor) {
                challengeDescriptor.innerHTML = data.description || 'No description available';
            }
        })
        .catch(error => {
            console.error('Error fetching challenge data:', error);
            const challengeDescriptor = document.getElementById('challenge_descriptor');
            if (challengeDescriptor) {
                challengeDescriptor.innerHTML = '<p>Error fetching challenge data.</p>';
            }
        });
});
