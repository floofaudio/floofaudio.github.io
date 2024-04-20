document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el, contentFile) {
        if (contentFile) {
            fetch(contentFile)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not OK');
                    }
                    return response.text();
                })
                .then(html => {
                    $el.querySelector('.modal-content .box').innerHTML = html;
                    $el.classList.add('is-active');
                })
                .catch(error => {
                    console.error('Failed to load modal content:', error);
                    $el.querySelector('.modal-content .box').innerHTML = '<p>Error loading content.</p>';
                });
        } else {
            $el.classList.add('is-active');
        }
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const contentFile = $trigger.dataset.contentFile; // Assume you have a data attribute for content
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target, contentFile);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});
