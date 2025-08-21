import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart3, 
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    totalMessages: 0,
    unreadMessages: 0,
    recentBookings: [],
    recentMessages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();

    // Subscribe to realtime updates
    const bookingsChannel = supabase
      .channel('admin-bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, fetchAnalytics)
      .subscribe();

    const messagesChannel = supabase
      .channel('admin-messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, fetchAnalytics)
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch bookings analytics
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch messages analytics
      const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      const bookingsData = bookings || [];
      const messagesData = messages || [];

      setAnalytics({
        totalBookings: bookingsData.length,
        pendingBookings: bookingsData.filter(b => b.status === 'pending').length,
        confirmedBookings: bookingsData.filter(b => b.status === 'confirmed').length,
        completedBookings: bookingsData.filter(b => b.status === 'completed').length,
        totalMessages: messagesData.length,
        unreadMessages: messagesData.filter(m => m.status === 'unread').length,
        recentBookings: bookingsData.slice(0, 5),
        recentMessages: messagesData.slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceTypeLabel = (serviceType: string) => {
    const serviceMap: { [key: string]: string } = {
      'individual': 'Individual Counseling',
      'group': 'Group Therapy',
      'family': 'Family & Marriage Counseling',
      'workplace': 'Workplace Counseling',
      'assessment': 'Psychological Assessment',
      'training-certificate': 'Certificate Training',
      'training-diploma': 'Diploma Training',
      'short-course': 'Short Course',
      'emergency': 'Emergency Session'
    };
    return serviceMap[serviceType] || serviceType;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your BRCTC website activity</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.pendingBookings} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.pendingBookings}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.unreadMessages} unread
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completedBookings}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Booking Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending</span>
              <Badge variant="destructive">{analytics.pendingBookings}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Confirmed</span>
              <Badge variant="default">{analytics.confirmedBookings}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Completed</span>
              <Badge variant="secondary">{analytics.completedBookings}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analytics.pendingBookings > 0 && (
              <div className="flex items-center space-x-2 p-2 bg-destructive/10 rounded">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm">{analytics.pendingBookings} bookings need review</span>
              </div>
            )}
            {analytics.unreadMessages > 0 && (
              <div className="flex items-center space-x-2 p-2 bg-blue-500/10 rounded">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{analytics.unreadMessages} unread messages</span>
              </div>
            )}
            {analytics.pendingBookings === 0 && analytics.unreadMessages === 0 && (
              <div className="flex items-center space-x-2 p-2 bg-green-500/10 rounded">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">All caught up!</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Service Popularity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.recentBookings.length > 0 ? (
              <div className="space-y-2">
                {Array.from(new Set(analytics.recentBookings.map((b: any) => b.service_type)))
                  .slice(0, 3)
                  .map((serviceType: any) => {
                    const count = analytics.recentBookings.filter((b: any) => b.service_type === serviceType).length;
                    return (
                      <div key={serviceType} className="flex items-center justify-between text-sm">
                        <span className="truncate">{getServiceTypeLabel(serviceType)}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No bookings yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest service bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">No bookings yet</p>
              ) : (
                analytics.recentBookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{booking.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {getServiceTypeLabel(booking.service_type)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={booking.status === 'pending' ? 'destructive' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet</p>
              ) : (
                analytics.recentMessages.map((message: any) => (
                  <div key={message.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{message.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={message.status === 'unread' ? 'destructive' : 'secondary'}>
                      {message.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}