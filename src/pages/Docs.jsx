import { useToast } from '../context/ToastContext';

export default function About() {
  const { addToast } = useToast();

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    addToast('Code snippet copied!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 text-gray-800">
      
      {/* HEADER */}
      <div className="border-b border-gray-200 pb-8 mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Mara Central API Documentation</h1>
        <p className="text-xl text-gray-600 font-light">
          A free, categorized, and metadata-rich image API for developers who need better placeholders than gray boxes.
        </p>
      </div>

      {/* QUICK START */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          ⚡ Quick Start
        </h2>
        <div className="bg-gray-900 text-gray-100 rounded-xl p-6 shadow-lg overflow-hidden relative group">
          <button 
            onClick={() => copyCode("https://api.maracentral.com")}
            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Copy
          </button>
          <code className="font-mono text-sm break-all">
            <span className="text-purple-400">GET</span> https://api.maracentral.com
          </code>
        </div>
      </section>

      {/* ENDPOINTS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Endpoints</h2>
        
        <div className="space-y-8">
          {/* Endpoint 1 */}
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold font-mono">GET</span>
              <code className="font-mono text-lg font-semibold">/</code>
            </div>
            <p className="text-gray-600 mb-4">Returns a JSON array of all available images across all categories.</p>
          </div>

          {/* Endpoint 2 */}
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold font-mono">GET</span>
              <code className="font-mono text-lg font-semibold">/?folder={'{category}'}</code>
            </div>
            <p className="text-gray-600 mb-4">Returns images from a specific folder only.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Available Categories</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white border rounded text-sm text-gray-600 font-mono">ai-generated</span>
                <span className="px-2 py-1 bg-white border rounded text-sm text-gray-600 font-mono">misc</span>
                <span className="px-2 py-1 bg-white border rounded text-sm text-gray-600 font-mono">self-taken</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE FORMAT */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Response Structure</h2>
        <p className="text-gray-600 mb-4">The API returns a flat array of objects. We calculate image dimensions server-side so you don't have to.</p>
        
        <div className="bg-gray-900 text-green-400 p-6 rounded-xl shadow-lg font-mono text-sm overflow-x-auto">
<pre>{`[
  {
    "id": "047ee07bc1ff5fb22e207cb1d6e96753",
    "title": "The Green Machine",
    "filename": "bearded-man-eating-cooked-kale-spinach-greens-healthy-vegan-2.jpg",
    "url": "https://api.maracentral.com/images/ai-generated/bearded-man-eating-cooked-kale-spinach-greens-healthy-vegan-2.jpg",
    "category": "ai-generated",
    "width": 2048,
    "height": 1152,
    "description": "A close-up, warm portrait of a man with a beard eating some greens.",
    "extended_description": null,
    "rating": 0,
    "tags": [
      "vegan",
      "collard greens",
      "eating",
      "vegetarian",
      "whole foods",
      "black man",
      "spinach",
      "portrait",
      "healthy diet",
      "comfort food",
      "sweater",
      "dining",
      "nutrition",
      "kale",
      "beard"
    ],
    "date_taken": "2025:12:31 13:35:36",
    "camera": {
      "model": "",
      "shutter": "",
      "aperture": "",
      "iso": "",
      "lens": "",
      "focal": ""
    }
  }
  ...
]`}</pre>
        </div>
      </section>

      {/* JAVASCRIPT EXAMPLE */}
      <section>
        <h2 className="text-2xl font-bold mb-6">React / JS Example</h2>
        <div className="bg-gray-900 text-gray-300 p-6 rounded-xl shadow-lg font-mono text-sm relative group overflow-x-auto">
             <button 
                onClick={() => copyCode(`const fetchImages = async () => {
      const res = await fetch('https://api.maracentral.com/');
      const data = await res.json();
      console.log(data);
    };`)}
                    className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Copy
                  </button>
    <pre>{`// Vanilla JS
    fetch('https://api.maracentral.com/?folder=ai-generated')
      .then(res => res.json())
      .then(data => console.log(data));

    // React Hook
    const { data } = useFetch('https://api.maracentral.com');`}</pre>
        </div>
      </section>

    </div>
  );
}