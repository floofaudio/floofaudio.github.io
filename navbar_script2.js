document.addEventListener('DOMContentLoaded', function () {
            const navbarItems = document.querySelectorAll('.navbar-item[data-content]');
            const mainContent = document.getElementById('main-content');

            navbarItems.forEach(item => {
                item.addEventListener('click', function () {
                    const contentToLoad = this.getAttribute('data-content');
                    // Show loading indicator
                    mainContent.innerHTML = '<p>Loading...</p>';

                    fetch(`${contentToLoad}.html`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(html => {
                            mainContent.innerHTML = html;
                            executeScripts(mainContent);
                        })
                        .catch(error => {
                            console.error('Failed to fetch page: ', error);
                            mainContent.innerHTML = '<p>Failed to load content. Please try again.</p>';
                        });
                });
            });

            function executeScripts(container) {
                // Find all script tags and execute them
                const scripts = Array.from(container.querySelectorAll('script'));
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    // Copy all attributes of the original script tag to the new script tag
                    Array.from(script.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.textContent = script.textContent;
                    script.parentNode.replaceChild(newScript, script);
                });
            }
        });