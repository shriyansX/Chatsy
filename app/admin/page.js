"use client"
import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  Shield, 
  BarChart3,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Download,
  Search,
  Star,
  Heart,
  Crown,
  Building2,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  DollarSign,
  Calendar,
  Award,
  Zap,
  Sparkles,
  Gift
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockStats = {
  totalUsers: 15247,
  activeUsers: 3422,
  totalMessages: 156847,
  onlineUsers: 847,
  totalChannels: 156,
  activeChannels: 89,
  averageResponseTime: "2.3s",
  uptime: "99.9%"
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'user_joined',
    user: 'john_doe',
    channel: 'general',
    timestamp: '2 minutes ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'message_sent',
    user: 'sarah_wilson',
    channel: 'developers',
    timestamp: '5 minutes ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'user_reported',
    user: 'spam_user',
    channel: 'python',
    timestamp: '12 minutes ago',
    status: 'warning'
  },
  {
    id: 4,
    type: 'channel_created',
    user: 'admin',
    channel: 'design-feedback',
    timestamp: '1 hour ago',
    status: 'info'
  }
];

const mockSponsors = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    logo: '/api/placeholder/120/60',
    tier: 'platinum',
    amount: '$5,000',
    duration: '12 months',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    status: 'active',
    description: 'Leading technology solutions provider specializing in enterprise software development.',
    website: 'https://techcorp.example.com',
    contact: 'partnerships@techcorp.com',
    features: ['Logo placement', 'Newsletter mentions', 'Event partnerships'],
    color: '#8B5CF6'
  },
  {
    id: 2,
    name: 'DevTools Pro',
    logo: '/api/placeholder/120/60',
    tier: 'gold',
    amount: '$2,500',
    duration: '6 months',
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    status: 'active',
    description: 'Professional development tools and IDE solutions for modern developers.',
    website: 'https://devtools.example.com',
    contact: 'sponsor@devtools.com',
    features: ['Banner ads', 'Content collaboration', 'Developer resources'],
    color: '#F59E0B'
  },
  {
    id: 3,
    name: 'CloudBase Inc',
    logo: '/api/placeholder/120/60',
    tier: 'silver',
    amount: '$1,000',
    duration: '3 months',
    startDate: '2024-06-01',
    endDate: '2024-09-01',
    status: 'pending',
    description: 'Cloud infrastructure and hosting solutions for scalable applications.',
    website: 'https://cloudbase.example.com',
    contact: 'marketing@cloudbase.com',
    features: ['Social media mentions', 'Community posts'],
    color: '#10B981'
  },
  {
    id: 4,
    name: 'StartupHub',
    logo: '/api/placeholder/120/60',
    tier: 'bronze',
    amount: '$500',
    duration: '1 month',
    startDate: '2024-07-01',
    endDate: '2024-08-01',
    status: 'expired',
    description: 'Supporting early-stage startups with resources and networking opportunities.',
    website: 'https://startuphub.example.com',
    contact: 'hello@startuphub.com',
    features: ['Directory listing', 'Basic mentions'],
    color: '#EF4444'
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'channels', label: 'Channels', icon: MessageSquare },
    { id: 'sponsors', label: 'Sponsors', icon: Star },
    { id: 'moderation', label: 'Moderation', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "whatsapp-green" }) => (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}/10`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center space-x-1 text-sm font-medium",
            trend.type === 'up' ? "text-green-600" : "text-red-600"
          )}>
            <TrendingUp className="w-4 h-4" />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-muted-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'user_joined': return Users;
        case 'message_sent': return MessageSquare;
        case 'user_reported': return AlertTriangle;
        case 'channel_created': return MessageSquare;
        default: return Activity;
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'success': return 'text-green-600 bg-green-50 border-green-200';
        case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'error': return 'text-red-600 bg-red-50 border-red-200';
        case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
      }
    };

    const Icon = getActivityIcon(activity.type);

    return (
      <div className="flex items-center space-x-4 p-4 hover:bg-accent/50 rounded-lg transition-colors">
        <div className={cn("p-2 rounded-lg border", getStatusColor(activity.status))}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            <span className="font-semibold">{activity.user}</span>
            {activity.type === 'user_joined' && ` joined ${activity.channel}`}
            {activity.type === 'message_sent' && ` sent a message in ${activity.channel}`}
            {activity.type === 'user_reported' && ` was reported in ${activity.channel}`}
            {activity.type === 'channel_created' && ` created ${activity.channel}`}
          </p>
          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => toast.info('View details feature will be available soon!')}>
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={mockStats.totalUsers.toLocaleString()}
          subtitle="Registered users"
          icon={Users}
          trend={{ type: 'up', value: '+12%' }}
        />
        <StatCard
          title="Active Today"
          value={mockStats.activeUsers.toLocaleString()}
          subtitle="Users online in last 24h"
          icon={Activity}
          trend={{ type: 'up', value: '+8%' }}
          color="blue-500"
        />
        <StatCard
          title="Messages Sent"
          value={mockStats.totalMessages.toLocaleString()}
          subtitle="Total messages today"
          icon={MessageSquare}
          trend={{ type: 'up', value: '+15%' }}
          color="purple-500"
        />
        <StatCard
          title="System Uptime"
          value={mockStats.uptime}
          subtitle={`Avg response: ${mockStats.averageResponseTime}`}
          icon={CheckCircle}
          color="green-500"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart Placeholder */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">User Activity</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => toast.info('Filtering feature will be available soon!')}>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.info('Export feature will be available soon!')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <div className="h-64 bg-accent/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Chart visualization would go here</p>
              <p className="text-xs text-muted-foreground mt-1">
                Integration with charting library needed
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('moderation')}>
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {mockRecentActivity.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">User Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
            />
          </div>
          <Button onClick={() => toast.info('Export feature coming soon!')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">User Management Interface</h3>
          <p className="text-muted-foreground">
            Advanced user management features would be implemented here
          </p>
        </div>
      </div>
    </div>
  );

  const SponsorCard = ({ sponsor }) => {
    const getTierIcon = (tier) => {
      switch (tier) {
        case 'platinum': return Crown;
        case 'gold': return Award;
        case 'silver': return Star;
        case 'bronze': return Gift;
        default: return Building2;
      }
    };

    const getTierColor = (tier) => {
      switch (tier) {
        case 'platinum': return 'from-purple-500 to-purple-600';
        case 'gold': return 'from-yellow-500 to-yellow-600';
        case 'silver': return 'from-gray-400 to-gray-500';
        case 'bronze': return 'from-orange-500 to-orange-600';
        default: return 'from-blue-500 to-blue-600';
      }
    };

    const getStatusBadge = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800 border-green-200';
        case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'expired': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const TierIcon = getTierIcon(sponsor.tier);
    const tierGradient = getTierColor(sponsor.tier);

    return (
      <div className="group bg-gradient-to-br from-card/90 via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02] overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/5 to-transparent opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-r ${tierGradient} shadow-lg`}>
                <TierIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors">
                  {sponsor.name}
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border",
                    getStatusBadge(sponsor.status)
                  )}>
                    {sponsor.status.charAt(0).toUpperCase() + sponsor.status.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground capitalize font-medium">
                    {sponsor.tier} Tier
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => window.open(sponsor.website, '_blank')}>
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => toast.info('Edit sponsor feature will be available soon!')}>
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {sponsor.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-3 border border-border/30">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-muted-foreground font-medium">Amount</span>
                </div>
                <p className="text-lg font-bold text-foreground">{sponsor.amount}</p>
              </div>
              <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-3 border border-border/30">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-muted-foreground font-medium">Duration</span>
                </div>
                <p className="text-lg font-bold text-foreground">{sponsor.duration}</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-purple-500" />
                Included Features
              </h4>
              <div className="flex flex-wrap gap-1">
                {sponsor.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200/30"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact & Website */}
            <div className="flex items-center justify-between pt-2 border-t border-border/30">
              <div className="text-xs text-muted-foreground">
                <p className="flex items-center">
                  <span className="font-medium">Contact:</span>
                  <span className="ml-1 truncate">{sponsor.contact}</span>
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Expires: {new Date(sponsor.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSponsors = () => {
    const activeSponsors = mockSponsors.filter(s => s.status === 'active').length;
    const totalRevenue = mockSponsors.reduce((sum, s) => {
      const amount = parseInt(s.amount.replace(/[$,]/g, ''));
      return sum + (s.status === 'active' ? amount : 0);
    }, 0);

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sponsor Management
            </h2>
            <p className="text-muted-foreground mt-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" />
              Manage your platform partnerships and sponsorships
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="hover:bg-purple-50 hover:border-purple-300" onClick={() => toast.info('Sponsor filtering will be available soon!')}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={() => toast.info('Add sponsor feature will be available soon!')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Sponsor
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Crown className="w-8 h-8" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{mockSponsors.length}</p>
                  <p className="text-purple-100 text-sm">Total Sponsors</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{activeSponsors}</p>
                  <p className="text-green-100 text-sm">Active</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8" />
                <div className="text-right">
                  <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                  <p className="text-blue-100 text-sm">Revenue</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8" />
                <div className="text-right">
                  <p className="text-2xl font-bold">+15%</p>
                  <p className="text-orange-100 text-sm">Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Current Sponsors</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search sponsors..."
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockSponsors.map(sponsor => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-accent/30 via-card to-accent/20 backdrop-blur-sm border border-border/50 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-all group"
                onClick={() => toast.info('Export report feature will be available soon!')}
              >
                <Download className="w-6 h-6 group-hover:text-purple-600" />
                <span className="text-sm">Export Report</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-300 transition-all group"
                onClick={() => toast.success('Sponsor contact feature will be available soon!')}
              >
                <Heart className="w-6 h-6 group-hover:text-green-600" />
                <span className="text-sm">Contact Sponsors</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-all group"
                onClick={() => toast.info('Analytics dashboard coming soon!')}
              >
                <BarChart3 className="w-6 h-6 group-hover:text-blue-600" />
                <span className="text-sm">View Analytics</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholderTab = (tabName, icon, description) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground capitalize">{tabName}</h2>
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="text-center py-12">
          {React.createElement(icon, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" })}
          <h3 className="text-lg font-semibold text-foreground mb-2">{tabName} Management</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your Chatsy application
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <Button onClick={() => toast.success('Dashboard refreshed!')}>
                <Activity className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-whatsapp-green text-whatsapp-green"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'channels' && renderPlaceholderTab('channels', MessageSquare, 'Channel management and moderation tools would be available here')}
        {activeTab === 'sponsors' && renderSponsors()}
        {activeTab === 'moderation' && renderPlaceholderTab('moderation', Shield, 'Content moderation and reporting tools would be implemented here')}
        {activeTab === 'settings' && renderPlaceholderTab('settings', Settings, 'System configuration and application settings would be managed here')}
      </div>
    </div>
  );
};

export default AdminDashboard;