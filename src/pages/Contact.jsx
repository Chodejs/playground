import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    website: '' // <--- THE HONEYPOT FIELD
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.maracentral.com/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to send');

      addToast('Message sent! We will get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '', website: '' });
      
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
          <p className="text-gray-400">Request a category, report a bug, or just say hi.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* THE HONEYPOT (Hidden from humans) */}
          <div className="hidden absolute opacity-0 -z-50">
            <label>Website</label>
            <input 
              type="text" 
              name="website" 
              value={formData.website} 
              onChange={handleChange} 
              tabIndex={-1} 
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Chris Tow"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="chris@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option>General Inquiry</option>
              <option>Request New Category</option>
              <option>Report API Bug</option>
              <option>Partnership</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="I would love to see a category for..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-4 rounded-xl font-bold text-white shadow-lg transform transition-all
              ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'}
            `}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Protected by <span className="text-gray-500 font-semibold">Emma's Anti-Bot Defense™</span>
      </p>
    </div>
  );
}