"use client"
import React from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { MessageCircle, Home, Users, Zap, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-primary hover:text-whatsapp-dark-green transition-colors">
            <MessageCircle className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-whatsapp-green to-whatsapp-dark-green bg-clip-text text-transparent">
              Chatsy
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Home</span>
            </Link>
            
            <Link 
              href="/forums" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
            >
              <Users className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Forums</span>
            </Link>
            
            <Link 
              href="/chat" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:bg-whatsapp-green hover:text-white transition-all duration-200 group"
            >
              <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Chat</span>
            </Link>
            
            <Link 
              href="/admin" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-200 group"
            >
              <Settings className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Admin</span>
            </Link>
            
            <div className="ml-4 pl-4 border-l border-border">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 ring-2 ring-whatsapp-green/20 hover:ring-whatsapp-green/40 transition-all duration-200",
                    userButtonPopoverCard: "shadow-xl border border-border",
                    userButtonPopoverText: "text-foreground"
                  }
                }}
              />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Link 
              href="/forums" 
              className="p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
            >
              <Users className="h-5 w-5" />
            </Link>
            
            <Link 
              href="/chat" 
              className="p-2 rounded-lg text-foreground hover:bg-whatsapp-green hover:text-white transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
            
            <Link 
              href="/admin" 
              className="p-2 rounded-lg text-foreground hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Link>
            
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 ring-2 ring-whatsapp-green/20"
                }
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-whatsapp-green via-whatsapp-dark-green to-whatsapp-green"></div>
    </nav>
  );
};

export default Navbar;
