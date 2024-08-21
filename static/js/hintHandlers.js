document.addEventListener('DOMContentLoaded', function() {
    const hintBtn = document.getElementById('hint-btn');
    const hintDiv = document.getElementById('hint_here');
    const closeHintBtn = document.querySelector('#hint_here .close-btn');
    const hintContent = document.getElementById('hint-content');

    // Show the hint when the hint button is clicked
    hintBtn.addEventListener('click', function() {
        fetch('/get_hint_description')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.hintDescription) {
                    hintContent.innerHTML = `<p>${data.hintDescription}</p>`;
                    hintDiv.style.display = 'block';
                } else {
                    console.error('Hint description data is missing.');
                }
            })
            .catch(error => console.error('Error fetching hint description:', error));
    });

    // Close the hint div
    if (closeHintBtn) {
        closeHintBtn.addEventListener('click', function() {
            hintDiv.style.display = 'none';
        });
    }
});
