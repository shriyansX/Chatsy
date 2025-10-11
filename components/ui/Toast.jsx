"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastItem = ({ toast, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };
  
  const Icon = icons[toast.type] || Info;
  
  const bgColors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  
  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);
      
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm",
        "animate-slideInRight transition-all duration-300 ease-out",
        "hover:shadow-xl transform hover:-translate-y-1",
        bgColors[toast.type] || bgColors.info
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", iconColors[toast.type])} />
      
      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="text-sm font-semibold mb-1 truncate">{toast.title}</h4>
        )}
        <p className="text-sm leading-relaxed">{toast.message}</p>
        
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-xs font-medium underline hover:no-underline transition-all"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      duration: 5000,
      type: 'info',
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const toast = {
    success: (message, options = {}) => addToast({ ...options, message, type: 'success' }),
    error: (message, options = {}) => addToast({ ...options, message, type: 'error' }),
    warning: (message, options = {}) => addToast({ ...options, message, type: 'warning' }),
    info: (message, options = {}) => addToast({ ...options, message, type: 'info' }),
    custom: (toast) => addToast(toast),
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast, clearAllToasts }}>
      {children}
      
      {/* Toast Container */}
      <div
        className="fixed top-4 right-4 z-[100] space-y-3 max-w-sm w-full"
        aria-label="Notifications"
      >
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;