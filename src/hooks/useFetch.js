import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/api';

/**
 * Custom hook for data fetching
 * @param {string} endpoint - The API endpoint (e.g., '/users')
 * @param {boolean} immediate - If true, fetch runs on mount. If false, wait for manual trigger.
 */
export function useFetch(endpoint, immediate = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate); // Start true if immediate
    const [error, setError] = useState(null);

    // useCallback ensures this function doesn't change on every render
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await apiClient.get(endpoint);
            setData(result);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        // AbortController could be added here for advanced cleanup, 
        // but for a boilerplate, this is sufficient.
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, loading, error, refetch: fetchData };
}