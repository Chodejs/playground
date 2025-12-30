import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useFetch } from '../hooks/useFetch';

export default function Home() {
    // Example: Fetching a list of users
    // If your .env API_URL is fake, this will show the error message.
    const { data, loading, error, refetch } = useFetch('/'); 

    const [visibleCount, setVisibleCount] = useState(9);

    const processedData = data
        ?.filter((item) => {
            return item.albumId === 1 && item.id <= 20; 
        })
        .sort((a, b) => {
            return a.id - b.id; 
        }) || []; // Fallback to empty array if data is null

    const visibleItems = processedData.slice(0, visibleCount);


    // The "Load More" magic
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 9);
        // addToast('More Content Loaded', 'success');
    };

    return (
        <section>
            <h1>Welcome Home</h1>
            <p>This is the starting point of your next masterpiece.</p>
            <ul>
                    {visibleItems.map((item, index) => (
                        <li key={item.id || index}>
                            <img 
                                src={item.thumbnailUrl} 
                                alt={item.title} 
                                className="w-full h-48 object-cover bg-gray-200"
                                onError={(e) => {
                                    // If the image fails, replace the source with a reliable backup immediately
                                    e.target.onerror = null; // Prevents infinite loop if backup fails too
                                    e.target.src = "https://placehold.co/150?text=No+Image"; 
                                }}
                            />
                            <p className='text-center'><span className='font-bold'>{item.title}</span></p>
                        </li>
                    ))}

                    {processedData.length > visibleCount && (
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <button onClick={handleLoadMore} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                Load More ({processedData.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}
            </ul>  

            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed #ccc' }}>
                <h3>API Test Zone</h3>

                {loading && <p>Loading data...</p>}

                {error && (
                    <div style={{ color: 'red' }}>
                        <p>Error: {error}</p>
                        <button onClick={refetch}>Try Again</button>
                    </div>
                )}
                               
            </div>
        </section>
    );
}