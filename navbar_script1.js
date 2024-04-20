document.addEventListener('DOMContentLoaded', () => {
    const navbarItems = document.querySelectorAll('.navbar-item[data-content]');
    const contentArea = document.getElementById('main-content');

    navbarItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const contentToLoad = item.getAttribute('data-content');
            fetch(`${contentToLoad}.html`)
                .then(response => response.text())
                .then(html => {
                    contentArea.innerHTML = html;
                    history.pushState({ path: contentToLoad }, '', contentToLoad);
                }).catch(err => console.error('Failed to load the page', err));
            event.preventDefault();
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            fetch(`${event.state.path}.html`)
                .then(response => response.text())
                .then(html => contentArea.innerHTML = html)
                .catch(err => console.error('Failed to load the page', err));
        }
    });
});
