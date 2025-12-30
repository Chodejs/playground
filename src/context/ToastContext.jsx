import { useState, createContext, useContext, useCallback, useEffect } from 'react';

// --------------------------------------------------------------------------
// PART 1: THE CONTEXT & HOOK
// --------------------------------------------------------------------------
const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// --------------------------------------------------------------------------
// PART 2: THE PROVIDER
// --------------------------------------------------------------------------
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
  // Generates a unique string like "36b8f84d-df4e-4d49..."
  const id = crypto.randomUUID(); 
  
  setToasts((prev) => [...prev, { id, message, type, duration }]);
}, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// --------------------------------------------------------------------------
// PART 3: THE VISUALS (The bit you were missing!)
// --------------------------------------------------------------------------
function ToastContainer({ toasts, removeToast }) {
  return (
    // fixed top-5 right-5 z-[9999] flex flex-col gap-3
    <div className="fixed top-5 right-5 z-9999 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ id, message, type, duration, removeToast }) {
  // Auto-dismiss logic remains the same
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, removeToast]);

  // Map "type" to Tailwind colors
  const typeStyles = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
  };

  return (
    <div
      onClick={() => removeToast(id)}
      className={`
        ${typeStyles[type] || 'bg-gray-500'} 
        text-white px-5 py-3 rounded-lg shadow-lg cursor-pointer pointer-events-auto
        min-w-62.5 font-sans animate-in slide-in-from-right fade-in duration-300
      `}
    >
      {message}
    </div>
  );
}