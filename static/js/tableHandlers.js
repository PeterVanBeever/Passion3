document.addEventListener('DOMContentLoaded', function() {
    const tableBtn = document.getElementById('table-btn');
    const tableDiv = document.getElementById('table_here');
    const closeTableBtn = document.querySelector('#table_here .close-btn');

    // Show the table div when the table button is clicked
    if (tableBtn) {
        tableBtn.addEventListener('click', function() {
            tableDiv.style.display = 'block';
        });
    }

    // Close the table div
    if (closeTableBtn) {
        closeTableBtn.addEventListener('click', function() {
            tableDiv.style.display = 'none';
        });
    }
});
