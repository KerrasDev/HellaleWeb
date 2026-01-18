/**
 * HellaleWeb Scripts - Fixed View Counter Logic
 * Centralized JavaScript for the blog
 */

// Configuration
const CONFIG = {
    namespace: 'hellaleweb',
    sessionPrefix: 'viewed_post_',
    apiBase: 'https://api.countapi.xyz'
};

// Initialize all scripts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('HellaleWeb scripts loaded');
    initializeViewCounters();
});

/**
 * Generate clean, unique post ID from URL
 * @param {string} url - The post URL
 * @returns {string} - Sanitized post ID
 */
function getPostId(url) {
    return url
        .replace(/^\/|\/$/g, '')              // Remove leading/trailing slashes
        .replace(/\.html?$/i, '')             // Remove .html extension
        .replace(/[^a-zA-Z0-9]/g, '-')        // Replace special chars with hyphens
        .replace(/-+/g, '-')                  // Replace multiple hyphens with single
        .toLowerCase();                        // Normalize to lowercase
}

/**
 * Check if post was already viewed in this session
 * @param {string} postId - The post identifier
 * @returns {boolean}
 */
function wasViewedInSession(postId) {
    return sessionStorage.getItem(CONFIG.sessionPrefix + postId) === 'true';
}

/**
 * Mark post as viewed in this session
 * @param {string} postId - The post identifier
 */
function markAsViewed(postId) {
    sessionStorage.setItem(CONFIG.sessionPrefix + postId, 'true');
}

/**
 * Fetch view count from CountAPI
 * @param {string} postId - The post identifier
 * @param {boolean} increment - Whether to increment the counter
 * @returns {Promise<number>}
 */
async function fetchViewCount(postId, increment = false) {
    const endpoint = increment ? 'hit' : 'get';
    const url = `${CONFIG.apiBase}/${endpoint}/${CONFIG.namespace}/${postId}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.value || 0;
    } catch (error) {
        console.error('Error fetching view count:', error);
        return 0;
    }
}

/**
 * Initialize view counter for individual post page
 */
async function initializePostViewCounter() {
    const viewCountElement = document.getElementById('view-count');
    if (!viewCountElement) {
        return; // Not on a post page
    }
    
    const postId = getPostId(window.location.pathname);
    const alreadyViewed = wasViewedInSession(postId);
    
    console.log(`Post ID: ${postId}, Already viewed: ${alreadyViewed}`);
    
    // Show loading state
    viewCountElement.textContent = '⏳';
    
    // Increment only if not viewed in this session
    const viewCount = await fetchViewCount(postId, !alreadyViewed);
    
    // Update display
    viewCountElement.textContent = viewCount;
    
    // Mark as viewed
    if (!alreadyViewed) {
        markAsViewed(postId);
        console.log(`View count incremented for: ${postId}`);
    } else {
        console.log(`Already viewed in session: ${postId}`);
    }
}

/**
 * Initialize view counters for post list pages
 */
async function initializeListViewCounters() {
    // Support multiple selectors for flexibility
    const selectors = [
        '.post-views-list',
        '.post-preview-views',
        '[data-view-counter]'
    ];
    
    let viewCountElements = [];
    selectors.forEach(selector => {
        viewCountElements.push(...document.querySelectorAll(selector));
    });
    
    if (viewCountElements.length === 0) {
        console.log('No list view counters found');
        return;
    }
    
    console.log(`Found ${viewCountElements.length} list view counter(s)`);
    
    // Process each view counter
    for (const element of viewCountElements) {
        const postUrl = element.getAttribute('data-post-url') || 
                       element.getAttribute('data-url');
        
        if (!postUrl) {
            console.warn('Post URL not found for element:', element);
            continue;
        }
        
        const postId = getPostId(postUrl);
        const viewCountSpan = element.querySelector('.view-count') || element;
        
        // Show loading
        viewCountSpan.textContent = '...';
        
        // Fetch count WITHOUT incrementing
        const viewCount = await fetchViewCount(postId, false);
        
        // Update display
        viewCountSpan.textContent = viewCount;
    }
}

/**
 * Main initialization function
 */
async function initializeViewCounters() {
    console.log('Initializing view counters...');
    
    try {
        // Initialize post view counter (if on post page)
        await initializePostViewCounter();
        
        // Initialize list view counters (if on list page)
        await initializeListViewCounters();
        
        console.log('View counters initialized successfully');
    } catch (error) {
        console.error('Error initializing view counters:', error);
    }
}

/**
 * Debug function to view all counters
 * Call from browser console: viewCounterStats()
 */
window.viewCounterStats = async function() {
    try {
        const response = await fetch(`${CONFIG.apiBase}/stats/${CONFIG.namespace}`);
        const data = await response.json();
        console.table(data);
        return data;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
};

/**
 * Debug function to reset a specific post counter
 * Call from browser console: resetPostCounter('/posts/my-post/')
 */
window.resetPostCounter = function(postUrl) {
    const postId = getPostId(postUrl);
    console.log(`To reset counter for "${postId}", visit:`);
    console.log(`${CONFIG.apiBase}/set/${CONFIG.namespace}/${postId}?value=0`);
};

/**
 * Debug function to check current session views
 * Call from browser console: getSessionViews()
 */
window.getSessionViews = function() {
    const views = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith(CONFIG.sessionPrefix)) {
            const postId = key.replace(CONFIG.sessionPrefix, '');
            views[postId] = sessionStorage.getItem(key);
        }
    }
    console.table(views);
    return views;
};

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Script error:', e.error);
});