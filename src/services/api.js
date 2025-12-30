// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * A wrapper around the native fetch API.
 * It handles the base URL and standard headers automatically.
 */
export const apiClient = {
    get: async (endpoint, options = {}) => {
        return customFetch(endpoint, { ...options, method: 'GET' });
    },
    post: async (endpoint, body, options = {}) => {
        return customFetch(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    },
    put: async (endpoint, body, options = {}) => {
        return customFetch(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },
    delete: async (endpoint, options = {}) => {
        return customFetch(endpoint, { ...options, method: 'DELETE' });
    }
};

/* Internal helper function */
async function customFetch(endpoint, options) {
    // 1. DEFINE THE URL (This was missing!)
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${BASE_URL}${cleanEndpoint}`;

    console.log("🚀 API Request starting...");
    console.log("🎯 Target URL:", url);

    // 2. DEFINE HEADERS (The "Smart" way that doesn't anger CORS)
    const defaultHeaders = {};
    
    // Only add JSON header if we are NOT doing a GET request
    if (options.method && options.method !== 'GET') {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        // 3. FETCH
        const response = await fetch(url, config);
        
        // Handle 404/500 errors
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Return empty object for 204 No Content
        if (response.status === 204) return {};
        
        return await response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
}