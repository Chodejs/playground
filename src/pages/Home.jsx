import { useState, useMemo, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';

export default function Home() {
  const { addToast } = useToast();
  // UPDATED URL: Pointing to your new API subdomain
  const { data, loading, error } = useFetch('/');
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // 1. EXTRACT CATEGORIES
  const categories = useMemo(() => {
    if (!data) return [];
    const uniqueCats = [...new Set(data.map((item) => item.category))].sort();
    return ['all', ...uniqueCats];
  }, [data]);

  // 2. FILTER DATA (Search + Category)
  const filteredImages = useMemo(() => {
    if (!data) return [];
    
    // Reset to page 1 whenever filters change so user isn't stuck on page 10 of empty results
    return data.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, activeCategory, searchTerm]);

  // Reset page when filter changes (useEffect is safer than inside useMemo)
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // 3. PAGINATION LOGIC
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const currentImages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredImages.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredImages, currentPage]);

  // Scroll to top when page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    addToast('Image URL copied to clipboard!', 'success');
  };

  if (loading) return <div className="text-center p-20 animate-pulse text-gray-500 text-xl">Loading The Vault...</div>;
  if (error) return <div className="text-center p-20 text-red-500 font-bold">Error: {error}</div>;

  return (
    <section className="p-6 max-w-7xl mx-auto min-h-screen flex flex-col">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-100 pb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            The Vault
            <span className="text-sm font-normal text-white ml-3 bg-gray-900 px-3 py-1 rounded-full align-middle">
              {filteredImages.length} items
            </span>
          </h1>
          
          {/* Search Input */}
          <div className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm"
            />
             {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-gray-600">✕</button>
             )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200
                ${activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
              `}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* IMAGE GRID */}
      {currentImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentImages.map((image) => (
            <div key={image.id} className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              
              {/* Image Container */}
              <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                 <img 
                   src={image.url} 
                   alt={image.title}
                   loading="lazy"
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 {/* Overlay Actions */}
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                   <button 
                     onClick={() => window.open(image.url, '_blank')}
                     className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors"
                   >
                     OPEN FULL
                   </button>
                   <button 
                     onClick={() => copyToClipboard(image.url)}
                     className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors"
                   >
                     COPY URL
                   </button>
                 </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {image.category.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {image.width} × {image.height}
                    </span>
                  </div>
                  <h3 className="text-md font-bold text-gray-800 truncate" title={image.title}>
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grow flex flex-col items-center justify-center text-gray-400 py-20 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
           <p className="text-lg">No assets found matching "{searchTerm}"</p>
           <button onClick={() => setSearchTerm('')} className="mt-4 text-blue-600 font-bold hover:underline">Clear Filters</button>
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {filteredImages.length > itemsPerPage && (
        <div className="mt-auto pt-8 border-t border-gray-100 flex justify-center items-center gap-2">
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {/* Simple Page Numbers */}
          <div className="flex gap-1">
             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`
                    w-10 h-10 rounded-lg text-sm font-bold transition-all
                    ${currentPage === page 
                      ? 'bg-gray-900 text-white shadow-lg scale-110' 
                      : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  {page}
                </button>
             ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

    </section>
  );
}