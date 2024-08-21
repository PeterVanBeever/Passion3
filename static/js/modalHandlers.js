document.addEventListener('DOMContentLoaded', function() {
    const newChallengeBtn = document.getElementById('new-challenge-btn');
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    const confirmRefreshBtn = document.getElementById('confirm-refresh');

    if (newChallengeBtn) {
        newChallengeBtn.addEventListener('click', function() {
            confirmModal.show();
        });
    }

    if (confirmRefreshBtn) {
        confirmRefreshBtn.addEventListener('click', function() {
            window.location.reload();
        });
    }
});
