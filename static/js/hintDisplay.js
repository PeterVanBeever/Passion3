document.addEventListener('DOMContentLoaded', function() {
    const hintButton = document.getElementById('hint-btn');
    const hintContainer = document.getElementById('hint_here');
    const closeButton = document.querySelector('#hint_here .close-btn'); // Select the close button

    // Handle hint button click to toggle visibility
    if (hintButton) {
        hintButton.addEventListener('click', function() {
            if (hintContainer.style.display === 'block') {
                // If hint container is already visible, hide it
                hintContainer.style.display = 'none';
            } else {
                // If hint container is not visible, show it
                hintContainer.style.display = 'block';
            }
        });
    }

    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            if (hintContainer) {
                hintContainer.style.display = 'none'; // Hide the hint container
            }
        });
    }
});
