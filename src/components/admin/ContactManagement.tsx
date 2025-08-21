import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  MessageSquare,
  RefreshCw,
  Trash2,
  Mail,
  Phone as PhoneIcon,
  Eye,
  Send,
  Download,
  Filter
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_type?: string;
  preferred_contact?: string;
  message: string;
  status: string;
  subject?: string;
  urgency_level: string;
  follow_up_required: boolean;
  assigned_to?: string;
  response_sent_at?: string;
  created_at: string;
  updated_at: string;
}

export function ContactManagement() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterUrgency, setFilterUrgency] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    fetchMessages();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('contact-messages-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, fetchMessages)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let filtered = messages;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(message => message.status === filterStatus);
    }

    // Filter by urgency
    if (filterUrgency !== "all") {
      filtered = filtered.filter(message => message.urgency_level === filterUrgency);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(message => 
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredMessages(filtered);
  }, [messages, filterStatus, filterUrgency, searchTerm]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact messages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      fetchMessages();
      toast({
        title: "Status Updated",
        description: "Message status has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchMessages();
      toast({
        title: "Message Deleted",
        description: "Contact message has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          status: 'replied',
          response_sent_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      fetchMessages();
      setReplyMessage("");
      toast({
        title: "Reply Sent",
        description: "Message has been marked as replied.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply.",
        variant: "destructive",
      });
    }
  };

  const exportMessages = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Phone,Subject,Message,Status,Urgency,Date\n" +
      filteredMessages.map(message => 
        `"${message.name}","${message.email}","${message.phone || ''}","${message.subject || ''}","${message.message.replace(/"/g, '""')}","${message.status}","${message.urgency_level}","${new Date(message.created_at).toLocaleDateString()}"`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `contact-messages-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'destructive';
      case 'read': return 'default';
      case 'replied': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={exportMessages} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchMessages}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium">Unread</p>
                <p className="text-2xl font-bold">{messages.filter(m => m.status === 'unread').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Replied</p>
                <p className="text-2xl font-bold">{messages.filter(m => m.status === 'replied').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">High Priority</p>
                <p className="text-2xl font-bold">{messages.filter(m => m.urgency_level === 'high').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, subject, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterUrgency} onValueChange={setFilterUrgency}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No contact messages found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card key={message.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold">{message.name}</h3>
                      <Badge variant={getStatusColor(message.status)}>
                        {message.status}
                      </Badge>
                      <Badge variant={getUrgencyColor(message.urgency_level)}>
                        {message.urgency_level} priority
                      </Badge>
                      {message.follow_up_required && (
                        <Badge variant="outline">Follow-up Required</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{message.email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center space-x-2">
                          <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{message.phone}</span>
                        </div>
                      )}
                      {message.service_type && (
                        <div className="flex items-center space-x-2">
                          <span><strong>Service:</strong> {message.service_type}</span>
                        </div>
                      )}
                    </div>

                    {message.subject && (
                      <div className="text-sm">
                        <strong>Subject:</strong> {message.subject}
                      </div>
                    )}

                    <p className="text-sm bg-muted/30 p-3 rounded">
                      {message.message.length > 150 
                        ? `${message.message.substring(0, 150)}...` 
                        : message.message
                      }
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Created: {new Date(message.created_at).toLocaleString()}</span>
                      {message.response_sent_at && (
                        <span>Replied: {new Date(message.response_sent_at).toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View & Reply
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Message from {message.name}</DialogTitle>
                          <DialogDescription>Contact form submission details</DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>Name:</strong> {message.name}</div>
                            <div><strong>Email:</strong> {message.email}</div>
                            <div><strong>Phone:</strong> {message.phone || 'Not provided'}</div>
                            <div><strong>Service Type:</strong> {message.service_type || 'Not specified'}</div>
                            <div><strong>Preferred Contact:</strong> {message.preferred_contact || 'Not specified'}</div>
                            <div><strong>Status:</strong> {message.status}</div>
                          </div>

                          {message.subject && (
                            <div>
                              <strong>Subject:</strong> {message.subject}
                            </div>
                          )}

                          <div>
                            <strong>Message:</strong>
                            <div className="bg-muted p-4 rounded mt-2">
                              {message.message}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <strong>Reply to {message.name}:</strong>
                            <Textarea
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type your reply here..."
                              rows={4}
                            />
                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => markAsReplied(message.id)}
                                disabled={!replyMessage.trim()}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Send Reply
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => updateMessageStatus(message.id, 'read')}
                              >
                                Mark as Read
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Select 
                      value={message.status} 
                      onValueChange={(value) => updateMessageStatus(message.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMessage(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}