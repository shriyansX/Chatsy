"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Plus, Search, Users, Zap, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import AdvancedSearch from "@/components/ui/AdvancedSearch"

const popularChats = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Talk about anything and everything',
    members: 1250,
    lastMessage: 'Hey everyone! Welcome to the chat!',
    lastActive: '2 min ago',
    color: 'from-blue-500 to-purple-500',
    avatar: '🌟'
  },
  {
    id: 'developers',
    name: 'Developers Hub',
    description: 'Share code, discuss tech, and collaborate',
    members: 890,
    lastMessage: 'Anyone working on React Native?',
    lastActive: '5 min ago',
    color: 'from-green-500 to-teal-500',
    avatar: '💻'
  },
  {
    id: 'design',
    name: 'Design & UI/UX',
    description: 'Creative minds sharing design ideas',
    members: 654,
    lastMessage: 'Check out this new design system!',
    lastActive: '12 min ago',
    color: 'from-pink-500 to-rose-500',
    avatar: '🎨'
  },
  {
    id: 'startup',
    name: 'Startup Stories',
    description: 'Entrepreneurs sharing their journey',
    members: 432,
    lastMessage: 'Just launched our MVP today! 🚀',
    lastActive: '18 min ago',
    color: 'from-orange-500 to-red-500',
    avatar: '🚀'
  }
];

const Chat = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ query: '', filters: null });

  const handleSearch = ({ query, filters }) => {
    setSearchResults({ query, filters });
    setSearchQuery(query);
  };

  const filteredChats = popularChats.filter(chat => {
    const matchesQuery = !searchQuery || 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Add filter logic here based on searchResults.filters if needed
    return matchesQuery;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-whatsapp-green/10 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-whatsapp-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join the <span className="bg-gradient-to-r from-whatsapp-green to-whatsapp-dark-green bg-clip-text text-transparent">Conversation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Connect with like-minded people in real-time chat rooms
            </p>
            
            {/* Advanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <AdvancedSearch
                onSearch={handleSearch}
                placeholder="Search chat rooms, messages, users..."
                showFilters={true}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Info */}
      {(searchQuery || searchResults.filters) && (
        <div className="container mx-auto px-4 mb-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between p-4 bg-card/50 border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-whatsapp-green" />
                <span className="text-sm text-muted-foreground">
                  {filteredChats.length} result{filteredChats.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                </span>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults({ query: '', filters: null });
                }}
                className="text-xs text-whatsapp-green hover:text-whatsapp-dark-green transition-colors"
              >
                Clear search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Rooms Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
          {filteredChats.map((chat, index) => (
            <div
              key={chat.id}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-whatsapp-green/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${chat.color}`}></div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${chat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {chat.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">{chat.name}</h3>
                      <p className="text-muted-foreground text-sm">{chat.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-whatsapp-green">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">{chat.members.toLocaleString()}</span>
                  </div>
                </div>

                {/* Last Message */}
                <div className="bg-accent/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-foreground italic">&apos;{chat.lastMessage}&apos;</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: {chat.lastActive}</p>
                </div>

                {/* Join Button */}
                <Link href={`/forum/${chat.id}`}>
                  <Button className="w-full bg-whatsapp-green hover:bg-whatsapp-dark-green text-white transition-all duration-200 group-hover:shadow-lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Chat
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Live indicator */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground font-medium">LIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredChats.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No chat rooms found</h3>
            <p className="text-muted-foreground">Try searching for something else or check out our popular forums</p>
          </div>
        )}

        {/* Create Room CTA */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-whatsapp-green" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Want to create your own chat room?</h3>
            <p className="text-muted-foreground mb-6">Start your own community and invite friends to join the conversation</p>
            <Link href="/forums">
              <Button size="lg" variant="outline" className="border-whatsapp-green text-whatsapp-green hover:bg-whatsapp-green hover:text-white">
                <Plus className="w-5 h-5 mr-2" />
                Explore All Forums
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-whatsapp-green/5 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-whatsapp-green">3.2k+</div>
              <div className="text-sm text-muted-foreground">Active Chatters</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-whatsapp-green">15k+</div>
              <div className="text-sm text-muted-foreground">Messages Today</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-whatsapp-green">24/7</div>
              <div className="text-sm text-muted-foreground">Always Online</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-whatsapp-green">&lt; 1s</div>
              <div className="text-sm text-muted-foreground">Message Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat
