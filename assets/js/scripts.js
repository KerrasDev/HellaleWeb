/**
 * HellaleWeb Scripts - Enhanced View Counter Logic
 * Centralized JavaScript for the blog with improved CountAPI integration
 */

// Configuration
const CONFIG = {
    namespace: 'hellaleweb',
    sessionPrefix: 'viewed_post_',
    apiBase: 'https://api.countapi.xyz',
    // Rate limiting: minimum time between requests (in ms)
    minRequestInterval: 1000,
    // Maximum retries for failed requests
    maxRetries: 3,
    // Retry delay in ms
    retryDelay: 500
};

// Track recent requests to prevent spam
const recentRequests = new Map();

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
    try {
        return sessionStorage.getItem(CONFIG.sessionPrefix + postId) === 'true';
    } catch (e) {
        // Handle cases where sessionStorage is not available
        console.warn('Session storage not available:', e);
        return false;
    }
}

/**
 * Mark post as viewed in this session
 * @param {string} postId - The post identifier
 */
function markAsViewed(postId) {
    try {
        sessionStorage.setItem(CONFIG.sessionPrefix + postId, 'true');
    } catch (e) {
        // Handle cases where sessionStorage is not available
        console.warn('Could not save to session storage:', e);
    }
}

/**
 * Check if request is too frequent (rate limiting)
 * @param {string} postId - The post identifier
 * @returns {boolean}
 */
function isRequestTooFrequent(postId) {
    const now = Date.now();
    const lastRequest = recentRequests.get(postId) || 0;
    
    if (now - lastRequest < CONFIG.minRequestInterval) {
        return true;
    }
    
    recentRequests.set(postId, now);
    return false;
}

/**
 * Delay function for retries
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch view count from CountAPI with retry logic and better debugging
 * @param {string} postId - The post identifier
 * @param {boolean} increment - Whether to increment the counter
 * @param {number} retryCount - Current retry attempt
 * @returns {Promise<number>}
 */
async function fetchViewCount(postId, increment = false, retryCount = 0) {
    // Rate limiting check
    if (isRequestTooFrequent(postId)) {
        console.warn(`Rate limited for post: ${postId}`);
        return 0;
    }
    
    const endpoint = increment ? 'hit' : 'get';
    const url = `${CONFIG.apiBase}/${endpoint}/${CONFIG.namespace}/${postId}`;
    
    console.log(`Fetching view count for ${postId}, endpoint: ${endpoint}, URL: ${url}`);
    
    try {
        const response = await fetch(url);
        console.log(`Response status: ${response.status} for ${postId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Received data for ${postId}:`, data);
        
        if (typeof data.value !== 'number') {
            console.warn(`Invalid data format for ${postId}`, data);
            return 0;
        }
        
        return data.value || 0;
    } catch (error) {
        console.error(`Error fetching view count for ${postId}:`, error);
        
        // Retry logic
        if (retryCount < CONFIG.maxRetries) {
            console.log(`Retrying (${retryCount + 1}/${CONFIG.maxRetries}) for ${postId}...`);
            await delay(CONFIG.retryDelay * (retryCount + 1)); // Exponential backoff
            return fetchViewCount(postId, increment, retryCount + 1);
        }
        
        console.error(`Failed to fetch view count after ${CONFIG.maxRetries} retries for ${postId}`);
        return 0;
    }
}

/**
 * Initialize view counter for individual post page
 */
async function initializePostViewCounter() {
    const viewCountElement = document.getElementById('view-count');
    if (!viewCountElement) {
        console.log('No view-count element found on this page');
        return; // Not on a post page
    }
    
    console.log('Found view-count element:', viewCountElement);
    
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
 * Initialize view counters for post list pages (including category pages)
 */
async function initializeListViewCounters() {
    // Support multiple selectors for flexibility
    const selectors = [
        '.post-views-list',
        '.post-preview-views',
        '[data-view-counter]',
        '.post-views'  // Also handle individual post view counters on list pages
    ];
    
    let viewCountElements = [];
    selectors.forEach(selector => {
        const found = document.querySelectorAll(selector);
        console.log(`Found ${found.length} elements with selector: ${selector}`);
        viewCountElements.push(...found);
    });
    
    if (viewCountElements.length === 0) {
        console.log('No list view counters found');
        return;
    }
    
    console.log(`Found ${viewCountElements.length} total view counter(s)`);
    
    // Process each view counter
    for (const element of viewCountElements) {
        console.log('Processing element:', element);
        
        // Look for post URL in various attributes
        let postUrl = element.getAttribute('data-post-url') || 
                     element.getAttribute('data-url') ||
                     element.closest('[data-post-url]')?.getAttribute('data-post-url') ||
                     element.closest('[data-url]')?.getAttribute('data-url');
        
        // If still no URL found, check if it's inside an article with a link
        if (!postUrl) {
            const linkEl = element.closest('article')?.querySelector('a[href*="/"]');
            if (linkEl) {
                postUrl = linkEl.getAttribute('href');
            }
        }
        
        if (!postUrl) {
            console.warn('Post URL not found for element:', element);
            continue;
        }
        
        console.log('Found post URL:', postUrl);
        
        const postId = getPostId(postUrl);
        const viewCountSpan = element.querySelector('.view-count') || element;
        
        console.log('Updating element:', viewCountSpan, 'with postId:', postId);
        
        // Show loading
        if (viewCountSpan.textContent === '0' || viewCountSpan.textContent === '...' || viewCountSpan.textContent === '--' || viewCountSpan.textContent === '⏳') {
            // Only update if it's showing a placeholder
            viewCountSpan.textContent = '...';
        }
        
        // Fetch count WITHOUT incrementing
        const viewCount = await fetchViewCount(postId, false);
        
        // Update display
        viewCountSpan.textContent = viewCount;
        
        console.log(`Updated view count for ${postId} to ${viewCount}`);
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
    try {
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key && key.startsWith(CONFIG.sessionPrefix)) {
                const postId = key.replace(CONFIG.sessionPrefix, '');
                views[postId] = sessionStorage.getItem(key);
            }
        }
    } catch (e) {
        console.warn('Session storage not available:', e);
    }
    console.table(views);
    return views;
};

/**
 * Force refresh a specific counter
 * Call from browser console: forceRefreshCounter('/posts/my-post/')
 */
window.forceRefreshCounter = async function(postUrl) {
    const postId = getPostId(postUrl);
    const viewCount = await fetchViewCount(postId, false); // Don't increment
    
    // Update any elements showing this counter
    const elements = document.querySelectorAll(`[data-post-url="${postUrl}"] .view-count, [data-url="${postUrl}"] .view-count`);
    elements.forEach(el => {
        el.textContent = viewCount;
    });
    
    console.log(`Force refreshed counter for ${postId}: ${viewCount}`);
    return viewCount;
};

/**
 * Clear session storage for view tracking
 * Call from browser console: clearViewSession()
 */
window.clearViewSession = function() {
    try {
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key && key.startsWith(CONFIG.sessionPrefix)) {
                sessionStorage.removeItem(key);
            }
        }
        console.log('Cleared view session storage');
    } catch (e) {
        console.warn('Could not clear session storage:', e);
    }
};

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Script error:', e.error);
});

// Cleanup old entries from recentRequests periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, timestamp] of recentRequests.entries()) {
        if (now - timestamp > CONFIG.minRequestInterval * 10) { // 10x interval
            recentRequests.delete(key);
        }
    }
}, CONFIG.minRequestInterval * 5); // Clean up every 5 intervals