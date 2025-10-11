"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Smile, Search } from 'lucide-react';
import { cn } from "@/lib/utils";

// Emoji categories with popular emojis
const EMOJI_CATEGORIES = {
  'Smileys & People': [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊',
    '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
    '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
    '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢',
    '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'
  ],
  'Animals & Nature': [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
    '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤',
    '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛',
    '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎'
  ],
  'Food & Drink': [
    '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
    '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🥬', '🌶', '🌽',
    '🥕', '🥔', '🍠', '🥐', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞',
    '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥙', '🌮', '🌯'
  ],
  'Activities': [
    '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓',
    '🏸', '🏒', '🏑', '🥍', '🏏', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋',
    '🎽', '🛹', '🛷', '⛸', '🥌', '🎿', '⛷', '🏂', '🪂', '🏋️‍♀️', '🏋️‍♂️', '🤼‍♀️',
    '🤼‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️‍♂️', '🏇', '🧘‍♀️'
  ],
  'Objects': [
    '⌚', '📱', '📲', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽',
    '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎',
    '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '🧭', '⏱', '⏲', '⏰', '🕰',
    '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸'
  ],
  'Symbols': [
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕',
    '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️',
    '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌',
    '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️'
  ]
};

const EmojiPicker = ({ onEmojiSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Smileys & People');
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  const getFilteredEmojis = () => {
    if (!searchQuery) return EMOJI_CATEGORIES[activeCategory] || [];
    
    const allEmojis = Object.values(EMOJI_CATEGORIES).flat();
    return allEmojis.filter(emoji => {
      // This is a simple filter - in a real app you'd want emoji names/keywords
      return emoji.includes(searchQuery);
    });
  };

  const filteredEmojis = getFilteredEmojis();

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
        aria-label="Open emoji picker"
        type="button"
      >
        <Smile className="w-5 h-5 text-muted-foreground hover:text-whatsapp-green transition-colors" />
      </button>

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute bottom-full right-0 mb-2 w-80 h-96 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeInScale"
          role="dialog"
          aria-label="Emoji picker"
        >
          {/* Header */}
          <div className="p-4 border-b border-border bg-accent/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search emojis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Tabs */}
          {!searchQuery && (
            <div className="flex overflow-x-auto px-2 py-2 border-b border-border bg-accent/10">
              {Object.keys(EMOJI_CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors",
                    activeCategory === category
                      ? "bg-whatsapp-green text-white"
                      : "hover:bg-accent text-muted-foreground"
                  )}
                >
                  {category.split(' ')[0]}
                </button>
              ))}
            </div>
          )}

          {/* Emoji Grid */}
          <div className="flex-1 overflow-y-auto p-3">
            {filteredEmojis.length > 0 ? (
              <div className="grid grid-cols-8 gap-1">
                {filteredEmojis.map((emoji, index) => (
                  <button
                    key={`${emoji}-${index}`}
                    onClick={() => handleEmojiClick(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-lg hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <p>No emojis found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;