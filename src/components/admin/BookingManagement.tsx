import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar,
  RefreshCw,
  Eye,
  CheckCircle,
  Clock,
  Mail,
  Phone as PhoneIcon,
  User,
  MapPin,
  CreditCard,
  FileText,
  Filter,
  Download
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  service_type: string;
  preferred_date?: string;
  preferred_time?: string;
  session_type: string;
  preferred_counselor_gender?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_history?: string;
  previous_therapy_experience: boolean;
  referral_source?: string;
  insurance_provider?: string;
  payment_method?: string;
  message?: string;
  status: string;
  consent_to_treatment: boolean;
  consent_to_communication: boolean;
  created_at: string;
  updated_at: string;
}

export function BookingManagement() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, fetchBookings)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, filterStatus, searchTerm]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        title: "Status Updated",
        description: "Booking status has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };

  const exportBookings = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Phone,Age,Gender,Service,Date,Time,Status,Created\n" +
      filteredBookings.map(booking => 
        `"${booking.name}","${booking.email}","${booking.phone || ''}","${booking.age || ''}","${booking.gender || ''}","${booking.service_type}","${booking.preferred_date || ''}","${booking.preferred_time || ''}","${booking.status}","${new Date(booking.created_at).toLocaleDateString()}"`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'confirmed': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'outline';
      default: return 'secondary';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground">Manage client bookings and appointments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={exportBookings} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchBookings}>
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
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Confirmed</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'completed').length}</p>
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
                placeholder="Search by name, email, or service..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No bookings found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold">{booking.name}</h3>
                      <Badge variant={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      {booking.age && (
                        <Badge variant="outline">Age: {booking.age}</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.email}</span>
                      </div>
                      {booking.phone && (
                        <div className="flex items-center space-x-2">
                          <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{getServiceTypeLabel(booking.service_type)}</span>
                      </div>
                    </div>

                    {(booking.preferred_date || booking.preferred_time) && (
                      <div className="flex items-center space-x-4 text-sm">
                        {booking.preferred_date && (
                          <span><strong>Date:</strong> {booking.preferred_date}</span>
                        )}
                        {booking.preferred_time && (
                          <span><strong>Time:</strong> {booking.preferred_time}</span>
                        )}
                        <span><strong>Session:</strong> {booking.session_type}</span>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(booking.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Booking Details - {booking.name}</DialogTitle>
                          <DialogDescription>Complete booking information</DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Personal Information */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Personal Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><strong>Name:</strong> {booking.name}</div>
                              <div><strong>Email:</strong> {booking.email}</div>
                              <div><strong>Phone:</strong> {booking.phone || 'Not provided'}</div>
                              <div><strong>Age:</strong> {booking.age || 'Not provided'}</div>
                              <div><strong>Gender:</strong> {booking.gender || 'Not provided'}</div>
                              <div><strong>Occupation:</strong> {booking.occupation || 'Not provided'}</div>
                            </div>
                          </div>

                          <Separator />

                          {/* Service Details */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Service Details
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><strong>Service:</strong> {getServiceTypeLabel(booking.service_type)}</div>
                              <div><strong>Session Type:</strong> {booking.session_type}</div>
                              <div><strong>Preferred Date:</strong> {booking.preferred_date || 'Not specified'}</div>
                              <div><strong>Preferred Time:</strong> {booking.preferred_time || 'Not specified'}</div>
                              <div><strong>Counselor Preference:</strong> {booking.preferred_counselor_gender || 'No preference'}</div>
                            </div>
                          </div>

                          <Separator />

                          {/* Emergency Contact */}
                          {(booking.emergency_contact_name || booking.emergency_contact_phone) && (
                            <>
                              <div>
                                <h4 className="font-medium mb-3 flex items-center">
                                  <PhoneIcon className="h-4 w-4 mr-2" />
                                  Emergency Contact
                                </h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div><strong>Name:</strong> {booking.emergency_contact_name || 'Not provided'}</div>
                                  <div><strong>Phone:</strong> {booking.emergency_contact_phone || 'Not provided'}</div>
                                </div>
                              </div>
                              <Separator />
                            </>
                          )}

                          {/* Medical & Background */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Medical & Background
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Previous Therapy:</strong> {booking.previous_therapy_experience ? 'Yes' : 'No'}</div>
                              <div><strong>Referral Source:</strong> {booking.referral_source || 'Not specified'}</div>
                              {booking.medical_history && (
                                <div><strong>Medical History:</strong> {booking.medical_history}</div>
                              )}
                            </div>
                          </div>

                          <Separator />

                          {/* Payment Information */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Payment Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><strong>Payment Method:</strong> {booking.payment_method || 'Not specified'}</div>
                              <div><strong>Insurance:</strong> {booking.insurance_provider || 'Not specified'}</div>
                            </div>
                          </div>

                          {booking.message && (
                            <>
                              <Separator />
                              <div>
                                <h4 className="font-medium mb-3">Additional Message</h4>
                                <p className="text-sm bg-muted p-3 rounded">{booking.message}</p>
                              </div>
                            </>
                          )}

                          <Separator />

                          {/* Consent Information */}
                          <div>
                            <h4 className="font-medium mb-3">Consent Status</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                {booking.consent_to_treatment ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Clock className="h-4 w-4 text-red-500" />
                                )}
                                <span>Treatment Consent: {booking.consent_to_treatment ? 'Provided' : 'Not Provided'}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {booking.consent_to_communication ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Clock className="h-4 w-4 text-red-500" />
                                )}
                                <span>Communication Consent: {booking.consent_to_communication ? 'Provided' : 'Not Provided'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Select value={booking.status} onValueChange={(value) => updateBookingStatus(booking.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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