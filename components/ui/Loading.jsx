"use client"
import React from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';

export const ChatLoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <Loader2 className={`${sizeClasses[size]} text-whatsapp-green`} />
    </div>
  );
};

export const FullPageLoader = ({ 
  title = "Loading...", 
  subtitle = "Setting up your experience" 
}) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-20 h-20 bg-whatsapp-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-10 h-10 text-whatsapp-green animate-pulse" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-whatsapp-green/20 border-t-whatsapp-green rounded-full animate-spin mx-auto"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-whatsapp-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-whatsapp-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-whatsapp-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export const InlineLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center space-x-3 py-8">
      <ChatLoadingSpinner />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
};

export default ChatLoadingSpinner;