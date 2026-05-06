"use client"
import React, { useState, useEffect } from 'react';
import { 
  useCreateChatClient, 
  Chat, 
  Channel, 
  ChannelHeader, 
  MessageInput, 
  MessageList, 
  Thread, 
  Window,
  LoadingIndicator
} from 'stream-chat-react';
import { Users, Phone, Video, MoreVertical, ArrowLeft, Send, Paperclip, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/Toast";
import EmojiPicker from "@/components/ui/EmojiPicker";
import Link from 'next/link';

// Remove the duplicate CSS import since it's now in globals.css

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Custom Channel Header Component
const CustomChannelHeader = ({ channel, title }) => {
  const memberCount = channel?.state?.memberCount || 0;
  const onlineCount = Object.values(channel?.state?.members || {}).filter(
    member => member.user?.online
  ).length;

  return (
    <div className="flex items-center justify-between bg-card border-b border-border p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <Link href="/forums">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-accent">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-whatsapp-green rounded-full flex items-center justify-center text-white font-semibold">
            {title?.charAt(0) || 'C'}
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {memberCount} members • {onlineCount} online
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-2 hover:bg-accent">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 hover:bg-accent">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 hover:bg-accent">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

// Custom Loading Component
const CustomLoadingIndicator = () => (
  <div className="flex items-center justify-center min-h-screen bg-whatsapp-bg">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-whatsapp-green mx-auto"></div>
      <p className="text-muted-foreground font-medium">Setting up your chat...</p>
      <p className="text-sm text-muted-foreground">Connecting to secure servers</p>
    </div>
  </div>
);

// Enhanced Message Input with emoji and file upload
const EnhancedMessageInput = ({ channel }) => {
  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();

  const handleEmojiSelect = (emoji) => {
    setMessageText(prev => prev + emoji);
  };

  const handleFileUpload = () => {
    toast.info('File upload feature coming soon!', {
      title: 'Feature Preview',
      duration: 3000
    });
  };

  const handleVoiceMessage = () => {
    toast.info('Voice message feature coming soon!', {
      title: 'Feature Preview',
      duration: 3000
    });
  };

  return (
    <div className="bg-card border-t border-border p-4">
      <div className="flex items-end space-x-3">
        {/* File Upload Button */}
        <button
          onClick={handleFileUpload}
          className="p-2 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
          aria-label="Upload file"
          type="button"
        >
          <Paperclip className="w-5 h-5 text-muted-foreground hover:text-whatsapp-green transition-colors" />
        </button>
        
        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-input border border-border rounded-full px-4 py-2">
            <div className="flex-1">
              <MessageInput 
                focus
                disableMentions={false}
                grow
                maxRows={3}
                value={messageText}
                onChange={setMessageText}
                additionalTextareaProps={{
                  placeholder: "Type a message...",
                  className: "bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-foreground placeholder-muted-foreground text-sm py-2",
                  style: { boxShadow: 'none' }
                }}
              />
            </div>
            
            {/* Emoji Picker */}
            <EmojiPicker 
              onEmojiSelect={handleEmojiSelect}
              className="ml-2"
            />
          </div>
        </div>
        
        {/* Voice Message Button */}
        <button
          onClick={handleVoiceMessage}
          className="p-2 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
          aria-label="Send voice message"
          type="button"
        >
          <Mic className="w-5 h-5 text-muted-foreground hover:text-whatsapp-green transition-colors" />
        </button>
      </div>
    </div>
  );
};

const ChatForum = ({ clerkUser, slug }) => {
  const apiKey = 'pq7a699xvrx2';
  const userId = clerkUser.id;
  const userName = clerkUser.name;
  const userToken = clerkUser.token;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const user = React.useMemo(() => ({
    id: userId,
    name: userName,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}&backgroundColor=00a884`,
  }), [userId, userName]);
  
  const [channel, setChannel] = useState();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    let isMounted = true;
    
    const setupChannel = async () => {
      if (!client) return;
      
      try {
        setIsLoading(true);
        
        const newChannel = client.channel('livestream', slug, {
          image: `https://api.dicebear.com/7.x/shapes/svg?seed=${slug}&backgroundColor=00a884`,
          name: capitalize(slug) + " Discussion",
        });

        // watch() automatically creates the channel if it doesn't exist
        await newChannel.watch();
        
        if (isMounted) {
          setChannel(newChannel);
          setIsLoading(false);
          
          toast.success(`Welcome to ${capitalize(slug)} Discussion!`, {
            title: 'Connected',
            duration: 3000
          });
        }
      } catch (err) {
        console.error('Error setting up channel:', err);
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
          
          toast.error('Failed to connect to chat room. Please try again.', {
            title: 'Connection Error',
            duration: 5000
          });
        }
      }
    };

    setupChannel();
    
    return () => {
      isMounted = false;
    };
  }, [client, slug, userId]);

  if (!client || isLoading) {
    return <CustomLoadingIndicator />;
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-whatsapp-bg">
        <div className="text-center space-y-4 max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">Connection Error</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-whatsapp-green hover:bg-whatsapp-dark-green text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-whatsapp-bg">
      <Chat client={client} theme="messaging light">
        <Channel 
          channel={channel}
          LoadingIndicator={LoadingIndicator}
        >
          <div className="flex flex-col h-full">
            <CustomChannelHeader 
              channel={channel} 
              title={capitalize(slug) + " Discussion"}
            />
            
            <div className="flex-1 overflow-hidden">
              <Window>
                <MessageList 
                  hideDeletedMessage
                  hideNewMessageSeparator={false}
                  messageActions={['edit', 'delete', 'reply', 'pin']}
                  threadList={false}
                />
                <EnhancedMessageInput channel={channel} />
              </Window>
            </div>
          </div>
          
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default ChatForum
