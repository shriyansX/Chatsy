"use client"
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  activeChannel: null,
  onlineUsers: [],
  notifications: [],
  preferences: {
    theme: 'light',
    soundEnabled: true,
    notificationsEnabled: true,
    language: 'en'
  },
  connectionStatus: 'disconnected', // disconnected, connecting, connected, error
  unreadCounts: {},
  isTyping: {},
  lastSeen: {}
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_ACTIVE_CHANNEL: 'SET_ACTIVE_CHANNEL',
  UPDATE_ONLINE_USERS: 'UPDATE_ONLINE_USERS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
  UPDATE_UNREAD_COUNT: 'UPDATE_UNREAD_COUNT',
  CLEAR_UNREAD_COUNT: 'CLEAR_UNREAD_COUNT',
  SET_TYPING_STATUS: 'SET_TYPING_STATUS',
  UPDATE_LAST_SEEN: 'UPDATE_LAST_SEEN',
  RESET_STATE: 'RESET_STATE'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ActionTypes.SET_ACTIVE_CHANNEL:
      return {
        ...state,
        activeChannel: action.payload
      };

    case ActionTypes.UPDATE_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };

    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          ...action.payload
        }]
      };

    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    case ActionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };

    case ActionTypes.UPDATE_PREFERENCES:
      const updatedPreferences = {
        ...state.preferences,
        ...action.payload
      };
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('chatsy-preferences', JSON.stringify(updatedPreferences));
      }
      
      return {
        ...state,
        preferences: updatedPreferences
      };

    case ActionTypes.SET_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.payload
      };

    case ActionTypes.UPDATE_UNREAD_COUNT:
      return {
        ...state,
        unreadCounts: {
          ...state.unreadCounts,
          [action.payload.channelId]: action.payload.count
        }
      };

    case ActionTypes.CLEAR_UNREAD_COUNT:
      const newUnreadCounts = { ...state.unreadCounts };
      delete newUnreadCounts[action.payload];
      return {
        ...state,
        unreadCounts: newUnreadCounts
      };

    case ActionTypes.SET_TYPING_STATUS:
      return {
        ...state,
        isTyping: {
          ...state.isTyping,
          [action.payload.channelId]: {
            ...state.isTyping[action.payload.channelId],
            [action.payload.userId]: action.payload.isTyping
          }
        }
      };

    case ActionTypes.UPDATE_LAST_SEEN:
      return {
        ...state,
        lastSeen: {
          ...state.lastSeen,
          [action.payload.userId]: action.payload.timestamp
        }
      };

    case ActionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPreferences = localStorage.getItem('chatsy-preferences');
      if (savedPreferences) {
        try {
          const preferences = JSON.parse(savedPreferences);
          dispatch({
            type: ActionTypes.UPDATE_PREFERENCES,
            payload: preferences
          });
        } catch (error) {
          console.error('Error parsing saved preferences:', error);
        }
      }
    }
  }, []);

  // Action creators
  const actions = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    
    setActiveChannel: (channel) => dispatch({ 
      type: ActionTypes.SET_ACTIVE_CHANNEL, 
      payload: channel 
    }),
    
    updateOnlineUsers: (users) => dispatch({ 
      type: ActionTypes.UPDATE_ONLINE_USERS, 
      payload: users 
    }),
    
    addNotification: (notification) => dispatch({ 
      type: ActionTypes.ADD_NOTIFICATION, 
      payload: notification 
    }),
    
    removeNotification: (id) => dispatch({ 
      type: ActionTypes.REMOVE_NOTIFICATION, 
      payload: id 
    }),
    
    clearNotifications: () => dispatch({ type: ActionTypes.CLEAR_NOTIFICATIONS }),
    
    updatePreferences: (preferences) => dispatch({ 
      type: ActionTypes.UPDATE_PREFERENCES, 
      payload: preferences 
    }),
    
    setConnectionStatus: (status) => dispatch({ 
      type: ActionTypes.SET_CONNECTION_STATUS, 
      payload: status 
    }),
    
    updateUnreadCount: (channelId, count) => dispatch({ 
      type: ActionTypes.UPDATE_UNREAD_COUNT, 
      payload: { channelId, count } 
    }),
    
    clearUnreadCount: (channelId) => dispatch({ 
      type: ActionTypes.CLEAR_UNREAD_COUNT, 
      payload: channelId 
    }),
    
    setTypingStatus: (channelId, userId, isTyping) => dispatch({ 
      type: ActionTypes.SET_TYPING_STATUS, 
      payload: { channelId, userId, isTyping } 
    }),
    
    updateLastSeen: (userId, timestamp) => dispatch({ 
      type: ActionTypes.UPDATE_LAST_SEEN, 
      payload: { userId, timestamp } 
    }),
    
    resetState: () => dispatch({ type: ActionTypes.RESET_STATE })
  };

  // Computed values
  const computed = {
    totalUnreadCount: Object.values(state.unreadCounts).reduce((sum, count) => sum + count, 0),
    isOnline: state.connectionStatus === 'connected',
    hasNotifications: state.notifications.length > 0
  };

  const contextValue = {
    ...state,
    ...actions,
    ...computed
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;