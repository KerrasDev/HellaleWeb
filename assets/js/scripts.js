/**
 * HellaleWeb Scripts
 * Centralized JavaScript for the blog
 */

// Initialize all scripts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeViewCounters();
});

/**
 * Initialize view counters for individual posts
 */
function initializePostViewCounter() {
    // Create a unique ID for this post based on its path
    const postPath = window.location.pathname.replace(/\//g, '-').replace(/^-|-$/g, '');
    const namespace = 'hellaleweb';
    const apiUrl = `https://api.countapi.xyz/hit/${namespace}/${postPath}`;
    
    // Fetch and increment view count
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the view count display
            const viewCountElement = document.getElementById('view-count');
            if (viewCountElement) {
                viewCountElement.textContent = data.value || 0;
            }
        })
        .catch(error => {
            console.error('Error fetching view count:', error);
            // Show 0 if there's an error
            const viewCountElement = document.getElementById('view-count');
            if (viewCountElement) {
                viewCountElement.textContent = '0';
            }
        });
}

/**
 * Initialize view counters for post lists
 */
function initializeListViewCounters() {
    const viewCountElements = document.querySelectorAll('.post-views-list');
    const namespace = 'hellaleweb';
    
    viewCountElements.forEach(element => {
        const postUrl = element.getAttribute('data-post-url');
        if (postUrl) {
            const postPath = postUrl.replace(/\//g, '-').replace(/^-|-$/g, '');
            
            // Use 'get' instead of 'hit' to not increment on list pages
            fetch(`https://api.countapi.xyz/get/${namespace}/${postPath}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const viewCountSpan = element.querySelector('.view-count');
                    if (viewCountSpan) {
                        viewCountSpan.textContent = (data.value || 0);
                    }
                })
                .catch(() => {
                    const viewCountSpan = element.querySelector('.view-count');
                    if (viewCountSpan) {
                        viewCountSpan.textContent = '0';
                    }
                });
        }
    });
}

/**
 * Main initialization function
 */
function initializeViewCounters() {
    // Check if we're on a single post page
    if (document.getElementById('view-count')) {
        initializePostViewCounter();
    }
    
    // Check if we're on a list page with view counters
    if (document.querySelectorAll('.post-views-list').length > 0) {
        initializeListViewCounters();
    }
}

/**
 * Utility function to get post path from URL
 * @param {string} url - The post URL
 * @returns {string} - Formatted path for CountAPI
 */
function getPostPath(url) {
    return url.replace(/\//g, '-').replace(/^-|-$/g, '');
}