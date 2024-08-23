document.addEventListener('DOMContentLoaded', function() {
    const hintButton = document.getElementById('hint-btn');
    const hintContentDiv = document.getElementById('hint-content');

    if (hintButton) {
        hintButton.addEventListener('click', async function() {
            try {
                const response = await fetch('/get_hint_description');
                if (response.ok) {
                    const data = await response.json();
                    if (hintContentDiv) {
                        hintContentDiv.innerHTML = data.hintDescription || 'No hint available';
                    } else {
                        console.error('Element with ID "hint-content" not found.');
                    }
                } else {
                    console.error('Error fetching hint. Status:', response.status);
                    if (hintContentDiv) {
                        hintContentDiv.innerHTML = 'Error fetching hint.';
                    }
                }
            } catch (error) {
                console.error('Error fetching hint:', error);
                if (hintContentDiv) {
                    hintContentDiv.innerHTML = 'Error fetching hint.';
                }
            }
        });
    }
});
