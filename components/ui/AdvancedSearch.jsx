"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X, Calendar, User, Hash } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./button";

const AdvancedSearch = ({ 
  onSearch, 
  placeholder = "Search messages, users, channels...",
  className,
  showFilters = true 
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all', // all, messages, users, channels
    dateRange: 'all', // all, today, week, month
    user: '',
    channel: ''
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchRef = useRef(null);
  const filtersRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query, filters });
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch({ query, filters: newFilters });
  };

  const clearFilters = () => {
    const defaultFilters = {
      type: 'all',
      dateRange: 'all',
      user: '',
      channel: ''
    };
    setFilters(defaultFilters);
    onSearch({ query, filters: defaultFilters });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== 'all' && value !== ''
  );

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSearch} className="relative">
        {/* Main Search Input */}
        <div className={cn(
          "relative flex items-center bg-input border border-border rounded-full transition-all duration-200",
          isExpanded ? "ring-2 ring-whatsapp-green border-whatsapp-green" : "hover:border-whatsapp-green/50"
        )}>
          <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
          
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
          />
          
          {/* Action Buttons */}
          <div className="absolute right-2 flex items-center space-x-1">
            {showFilters && (
              <button
                type="button"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={cn(
                  "p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-whatsapp-green",
                  hasActiveFilters 
                    ? "bg-whatsapp-green text-white hover:bg-whatsapp-dark-green" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
                aria-label="Toggle filters"
              >
                <Filter className="w-4 h-4" />
              </button>
            )}
            
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-2 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {isFiltersOpen && showFilters && (
          <div
            ref={filtersRef}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border border-border rounded-2xl shadow-2xl z-50 animate-fadeInScale"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Search Filters</h3>
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Type */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Search In
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
                >
                  <option value="all">Everything</option>
                  <option value="messages">Messages</option>
                  <option value="users">Users</option>
                  <option value="channels">Channels</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Time Period
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
                >
                  <option value="all">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {/* Specific User */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  From User
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={filters.user}
                    onChange={(e) => handleFilterChange('user', e.target.value)}
                    placeholder="Username"
                    className="w-full pl-10 pr-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
                  />
                </div>
              </div>

              {/* Specific Channel */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  In Channel
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={filters.channel}
                    onChange={(e) => handleFilterChange('channel', e.target.value)}
                    placeholder="Channel name"
                    className="w-full pl-10 pr-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdvancedSearch;