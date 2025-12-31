import React from 'react';

export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  console.log("Modal Data:", image);

  // --- 1. TITLE CLEANUP LOGIC ---
  const cleanTitle = (rawTitle) => {
    if (!rawTitle) return "Untitled";

    // Step 1: Remove file extensions (case insensitive)
    let title = rawTitle.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "");

    // Step 2: Remove common "duplicate" suffixes like "-2", " 2", or "(1)"
    title = title.replace(/[-_ ]\d+$/, ""); // Removes trailing numbers like "-2"

    // Step 3: Replace delimiters (- and _) with spaces
    title = title.replace(/[-_]/g, " ");

    // Step 4: Title Case (Capitalize first letter of each word)
    return title.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // --- 2. FILENAME FALLBACK ---
  // If api didn't send 'filename', grab it from the URL
  const displayFilename = image.filename || image.url.split('/').pop();

  // --- 3. DATE FORMATTER ---
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      // Handle "YYYY:MM:DD HH:MM:SS" format
      const parseableDate = dateString.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3');
      const date = new Date(parseableDate);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', month: 'long', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex text-yellow-400 gap-1 text-lg" title={`Rating: ${rating}/5`}>
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < rating ? '★' : '☆'}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* LEFT: Image Area */}
        <div className="w-full md:w-2/3 bg-gray-950 flex items-center justify-center p-4">
          <img 
            src={image.url} 
            alt={cleanTitle(image.title)} 
            className="max-h-[50vh] md:max-h-[85vh] w-auto object-contain shadow-2xl"
          />
        </div>

        {/* RIGHT: Metadata Scrollable Area */}
        <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto bg-white border-l border-gray-100 flex flex-col gap-6">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase rounded-full tracking-wider">
                {image.category}
              </span>
              {renderStars(image.rating)}
            </div>
            
            {/* CLEAN TITLE DISPLAYED HERE */}
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
              {cleanTitle(image.title)}
            </h2>
            
            {image.date_taken && (
              <p className="text-sm text-gray-400 font-mono flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {formatDate(image.date_taken)}
              </p>
            )}
          </div>

          {/* Description */}
          {/* We check description OR caption OR extended_description */}
          {(image.description || image.caption || image.extended_description) && (
            <div className="prose prose-sm prose-gray bg-gray-50 p-4 rounded-xl border border-gray-100">
              {(image.description || image.caption) && (
                  <p className="font-medium text-gray-800 mb-2">
                      {image.description || image.caption}
                  </p>
              )}
              {image.extended_description && (
                  <p className="text-gray-600 text-xs leading-relaxed border-t border-gray-200 pt-2 mt-2">
                      {image.extended_description}
                  </p>
              )}
            </div>
          )}

          {/* Basic File Details */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
             <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-wider font-bold">Resolution</span>
                <span className="text-sm font-mono text-gray-700">{image.width} × {image.height} px</span>
             </div>
             <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-wider font-bold">Filename</span>
                {/* FALLBACK USED HERE */}
                <span className="text-sm font-mono text-gray-700 truncate block" title={displayFilename}>
                    {displayFilename}
                </span>
             </div>
          </div>

          {/* Camera Tech Specs */}
          {image.camera && (image.camera.model || image.camera.lens) && (
            <div className="bg-gray-900 text-gray-300 rounded-xl p-5 shadow-inner">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 Camera Settings
              </h3>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                {image.camera.model && (
                  <div className="col-span-2 border-b border-gray-800 pb-2">
                    <span className="block text-gray-500 text-[10px]">Model</span>
                    <span className="font-semibold text-white">{image.camera.model}</span>
                  </div>
                )}
                {image.camera.lens && (
                   <div className="col-span-2 border-b border-gray-800 pb-2">
                    <span className="block text-gray-500 text-[10px]">Lens</span>
                    <span className="font-semibold text-white">{image.camera.lens}</span>
                  </div>
                )}
                {image.camera.iso && (
                  <div>
                    <span className="block text-gray-500 text-[10px]">ISO</span>
                    <span className="font-mono text-white">{image.camera.iso}</span>
                  </div>
                )}
                {image.camera.aperture && (
                  <div>
                    <span className="block text-gray-500 text-[10px]">Aperture</span>
                    <span className="font-mono text-white">{image.camera.aperture}</span>
                  </div>
                )}
                 {image.camera.shutter && (
                  <div>
                    <span className="block text-gray-500 text-[10px]">Shutter</span>
                    <span className="font-mono text-white">{image.camera.shutter}s</span>
                  </div>
                )}
                 {image.camera.focal && (
                  <div>
                    <span className="block text-gray-500 text-[10px]">Focal Length</span>
                    <span className="font-mono text-white">{image.camera.focal}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {image.tags && Array.isArray(image.tags) && image.tags.length > 0 && (
            <div>
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</h3>
               <div className="flex flex-wrap gap-2">
                 {image.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default">
                     #{tag}
                   </span>
                 ))}
               </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto pt-6 border-t border-gray-100 flex gap-3">
             <button 
               onClick={() => window.open(image.url, '_blank')}
               className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-200"
             >
               Download Original
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}