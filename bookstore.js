// Example JavaScript to switch active tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        this.classList.add('active');
        // Additional code for loading relevant book categories
    });
});
