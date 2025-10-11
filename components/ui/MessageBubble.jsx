"use client"
import React from 'react';
import { Check, CheckCheck, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";

export const MessageBubble = ({ 
  message, 
  isOwn = false, 
  timestamp, 
  isRead = false,
  isDelivered = false,
  className,
  children 
}) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isOwn ? "justify-end" : "justify-start",
      className
    )}>
      <div className={cn(
        "relative max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
        "animate-messageSlideIn",
        isOwn 
          ? "bg-whatsapp-light-green text-foreground rounded-br-md" 
          : "bg-message-received text-foreground rounded-bl-md",
        "dark:shadow-md"
      )}>
        {/* Message content */}
        <div className="break-words whitespace-pre-wrap leading-relaxed">
          {children || message}
        </div>
        
        {/* Timestamp and status */}
        <div className={cn(
          "flex items-center justify-end mt-1 space-x-1",
          "text-xs text-muted-foreground"
        )}>
          <span className="opacity-70">
            {timestamp || new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          
          {isOwn && (
            <div className="flex items-center">
              {isRead ? (
                <CheckCheck className="w-3 h-3 text-blue-500" />
              ) : isDelivered ? (
                <CheckCheck className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Check className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          )}
        </div>
        
        {/* Message tail */}
        <div className={cn(
          "absolute top-0 w-0 h-0",
          isOwn 
            ? "right-0 translate-x-1 border-l-8 border-l-whatsapp-light-green border-t-8 border-t-transparent dark:border-l-whatsapp-light-green/80"
            : "left-0 -translate-x-1 border-r-8 border-r-message-received border-t-8 border-t-transparent dark:border-r-message-received"
        )} />
      </div>
    </div>
  );
};

export const TypingIndicator = ({ userName = "Someone" }) => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="relative max-w-[70%] rounded-2xl rounded-bl-md px-4 py-3 bg-message-received shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground italic">{userName} is typing</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;