import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { supabase } from "@/integrations/supabase/client";
import { 
  Settings, 
  Users, 
  BarChart3, 
  MessageSquare,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  Trash2,
  Save,
  RefreshCw,
  FileText,
  Mail,
  Phone as PhoneIcon
} from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const { settings, loading, updateSetting } = useAdminSettings();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [contacts, setContacts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [localSettings, setLocalSettings] = useState<{[key: string]: string}>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  // Real analytics data from database
  const analytics = {
    newMessages: contacts.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    unreadMessages: contacts.filter(c => c.status === 'unread').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length
  };

  useEffect(() => {
    if (!loading) {
      setLocalSettings(settings);
    }
  }, [settings, loading]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
      fetchBookings();

      // Subscribe to realtime updates
      const contactsChannel = supabase
        .channel('contacts-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, fetchContacts)
        .subscribe();

      const bookingsChannel = supabase
        .channel('bookings-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, fetchBookings)
        .subscribe();

      return () => {
        supabase.removeChannel(contactsChannel);
        supabase.removeChannel(bookingsChannel);
      };
    }
  }, [isAuthenticated]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        toast({
          title: "Error",
          description: `Failed to fetch contacts: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error", 
          description: `Failed to fetch bookings: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "brctc2024") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials.",
        variant: "destructive",
      });
    }
  };

  const handleSettingChange = (key: string, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    try {
      for (const [key, value] of Object.entries(localSettings)) {
        if (settings[key] !== value) {
          await updateSetting(key, value);
        }
      }
      toast({
        title: "Settings Saved",
        description: "All changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      fetchContacts();
      toast({
        title: "Status Updated",
        description: "Contact message status has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchContacts();
      toast({
        title: "Message Deleted",
        description: "Contact message has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      fetchBookings();
      toast({
        title: "Booking Updated",
        description: "Booking status has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Access the BRCTC admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your BRCTC website content and client interactions
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.newMessages}</div>
                  <p className="text-xs text-muted-foreground">
                    {analytics.unreadMessages} unread
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.pendingBookings}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Bookings</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.completedBookings}</div>
                  <p className="text-xs text-muted-foreground">Successfully completed</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest contact form submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contacts.slice(0, 5).map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <Badge variant={contact.status === 'unread' ? 'destructive' : 'secondary'}>
                          {contact.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest service bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{booking.name}</p>
                          <p className="text-sm text-muted-foreground">{booking.service_type}</p>
                        </div>
                        <Badge variant={booking.status === 'pending' ? 'destructive' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-6 w-6 mr-3 text-primary" />
                  Website Settings
                </CardTitle>
                <CardDescription>
                  Update your website content and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero_title">Hero Title</Label>
                    <Input
                      id="hero_title"
                      value={localSettings.hero_title || ''}
                      onChange={(e) => handleSettingChange('hero_title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site_title">Site Title</Label>
                    <Input
                      id="site_title"
                      value={localSettings.site_title || ''}
                      onChange={(e) => handleSettingChange('site_title', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                  <Textarea
                    id="hero_subtitle"
                    rows={3}
                    value={localSettings.hero_subtitle || ''}
                    onChange={(e) => handleSettingChange('hero_subtitle', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision_statement">Vision Statement</Label>
                  <Textarea
                    id="vision_statement"
                    rows={4}
                    value={localSettings.vision_statement || ''}
                    onChange={(e) => handleSettingChange('vision_statement', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mission_statement">Mission Statement</Label>
                  <Textarea
                    id="mission_statement"
                    rows={4}
                    value={localSettings.mission_statement || ''}
                    onChange={(e) => handleSettingChange('mission_statement', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Phone Number</Label>
                    <Input
                      id="contact_phone"
                      value={localSettings.contact_phone || ''}
                      onChange={(e) => handleSettingChange('contact_phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Email Address</Label>
                    <Input
                      id="contact_email"
                      value={localSettings.contact_email || ''}
                      onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_address">Address</Label>
                    <Input
                      id="contact_address"
                      value={localSettings.contact_address || ''}
                      onChange={(e) => handleSettingChange('contact_address', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office_hours">Office Hours</Label>
                  <Input
                    id="office_hours"
                    value={localSettings.office_hours || ''}
                    onChange={(e) => handleSettingChange('office_hours', e.target.value)}
                  />
                </div>

                <Button onClick={saveSettings} className="w-full" disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-6 w-6 mr-3 text-primary" />
                      Contact Messages
                    </CardTitle>
                    <CardDescription>
                      Manage messages from your contact form
                    </CardDescription>
                  </div>
                  <Button onClick={fetchContacts} size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingData ? (
                    <p>Loading messages...</p>
                  ) : contacts.length === 0 ? (
                    <p className="text-muted-foreground">No messages found.</p>
                  ) : (
                    contacts.map((contact) => (
                      <Card key={contact.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-4">
                              <h4 className="font-semibold">{contact.name}</h4>
                              <Badge variant={contact.status === 'unread' ? 'destructive' : 'secondary'}>
                                {contact.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {contact.email}
                              </span>
                              {contact.phone && (
                                <span className="flex items-center">
                                  <PhoneIcon className="h-4 w-4 mr-1" />
                                  {contact.phone}
                                </span>
                              )}
                            </div>
                            {contact.service_type && (
                              <p className="text-sm">
                                <strong>Service:</strong> {contact.service_type}
                              </p>
                            )}
                            <p className="text-sm">{contact.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(contact.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact.id, contact.status === 'unread' ? 'read' : 'unread')}
                            >
                              {contact.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteContact(contact.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-6 w-6 mr-3 text-primary" />
                      Service Bookings
                    </CardTitle>
                    <CardDescription>
                      Manage client bookings and appointments
                    </CardDescription>
                  </div>
                  <Button onClick={fetchBookings} size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingData ? (
                    <p>Loading bookings...</p>
                  ) : bookings.length === 0 ? (
                    <p className="text-muted-foreground">No bookings found.</p>
                  ) : (
                    bookings.map((booking) => (
                      <Card key={booking.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-4">
                              <h4 className="font-semibold">{booking.name}</h4>
                              <Badge variant={booking.status === 'pending' ? 'destructive' : 'secondary'}>
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {booking.email}
                              </span>
                              {booking.phone && (
                                <span className="flex items-center">
                                  <PhoneIcon className="h-4 w-4 mr-1" />
                                  {booking.phone}
                                </span>
                              )}
                            </div>
                            <p className="text-sm">
                              <strong>Service:</strong> {booking.service_type}
                            </p>
                            {booking.preferred_date && (
                              <p className="text-sm">
                                <strong>Preferred Date:</strong> {booking.preferred_date}
                              </p>
                            )}
                            {booking.preferred_time && (
                              <p className="text-sm">
                                <strong>Preferred Time:</strong> {booking.preferred_time}
                              </p>
                            )}
                            {booking.message && (
                              <p className="text-sm">
                                <strong>Message:</strong> {booking.message}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {new Date(booking.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBookingStatus(booking.id, booking.status === 'pending' ? 'confirmed' : 'pending')}
                            >
                              {booking.status === 'pending' ? 'Confirm' : 'Mark Pending'}
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                            >
                              Complete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;