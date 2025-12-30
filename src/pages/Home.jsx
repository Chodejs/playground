import { useToast } from '../context/ToastContext';
import { useFetch } from '../hooks/useFetch';

export default function Home() {
    // Example: Fetching a list of users
    // If your .env API_URL is fake, this will show the error message.
    const { data, loading, error, refetch } = useFetch('/breeds/image/random'); 

   

    return (
        <section>
            <h1>Welcome Home</h1>
            <p>This is the starting point of your next masterpiece.</p>

            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed #ccc' }}>
                <h3>API Test Zone</h3>
                
                {loading && <p>Loading data...</p>}
                
                {error && (
                    <div style={{ color: 'red' }}>
                        <p>Error: {error}</p>
                        <button onClick={refetch}>Try Again</button>
                    </div>
                )}

                {data && (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
            </div>
        </section>
    );
}