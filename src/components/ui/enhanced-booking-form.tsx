import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar,
  ChevronRight,
  ChevronLeft,
  Send,
  User,
  FileText,
  Shield,
  Clock
} from "lucide-react";

const EnhancedBookingForm = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    occupation: "",

    // Step 2: Service Details
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    sessionType: "in-person",
    preferredCounselorGender: "",

    // Step 3: Medical & Background
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalHistory: "",
    previousTherapyExperience: false,
    referralSource: "",
    insuranceProvider: "",
    paymentMethod: "",

    // Step 4: Final Details
    message: "",
    consentToTreatment: false,
    consentToCommunication: false
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      occupation: "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      sessionType: "in-person",
      preferredCounselorGender: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicalHistory: "",
      previousTherapyExperience: false,
      referralSource: "",
      insuranceProvider: "",
      paymentMethod: "",
      message: "",
      consentToTreatment: false,
      consentToCommunication: false
    });
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentToTreatment) {
      toast({
        title: "Consent Required",
        description: "Please provide consent to treatment to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age ? parseInt(formData.age) : null,
          gender: formData.gender,
          occupation: formData.occupation,
          service_type: formData.serviceType,
          preferred_date: formData.preferredDate || null,
          preferred_time: formData.preferredTime || null,
          session_type: formData.sessionType,
          preferred_counselor_gender: formData.preferredCounselorGender,
          emergency_contact_name: formData.emergencyContactName,
          emergency_contact_phone: formData.emergencyContactPhone,
          medical_history: formData.medicalHistory,
          previous_therapy_experience: formData.previousTherapyExperience,
          referral_source: formData.referralSource,
          insurance_provider: formData.insuranceProvider,
          payment_method: formData.paymentMethod,
          message: formData.message,
          consent_to_treatment: formData.consentToTreatment,
          consent_to_communication: formData.consentToCommunication
        });

      if (error) throw error;

      toast({
        title: "Application Submitted Successfully",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });
      
      resetForm();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const services = [
    { value: "individual", label: "Individual Counseling" },
    { value: "group", label: "Group Therapy" },
    { value: "family", label: "Family & Marriage Counseling" },
    { value: "workplace", label: "Workplace Counseling" },
    { value: "assessment", label: "Psychological Assessment" },
    { value: "training-certificate", label: "Certificate Training Program" },
    { value: "training-diploma", label: "Diploma Training Program" },
    { value: "short-course", label: "Short Course" },
    { value: "emergency", label: "Emergency Session" }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const stepTitles = [
    { icon: User, title: "Personal Information" },
    { icon: Clock, title: "Service Details" },
    { icon: FileText, title: "Background Information" },
    { icon: Shield, title: "Consent & Submission" }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+254 721 683232"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                placeholder="Your profession or occupation"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionType">Session Type</Label>
                <Select value={formData.sessionType} onValueChange={(value) => handleInputChange("sessionType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredCounselorGender">Preferred Counselor Gender</Label>
              <Select value={formData.preferredCounselorGender} onValueChange={(value) => handleInputChange("preferredCounselorGender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="no-preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Contact person name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  placeholder="+254 721 683232"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referralSource">How did you hear about us?</Label>
                <Select value={formData.referralSource} onValueChange={(value) => handleInputChange("referralSource", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friend-family">Friend/Family</SelectItem>
                    <SelectItem value="doctor">Doctor/Medical Professional</SelectItem>
                    <SelectItem value="internet">Internet Search</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider (if applicable)</Label>
              <Input
                id="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                placeholder="e.g., NHIF, AAR, CIC"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Relevant Medical History</Label>
              <Textarea
                id="medicalHistory"
                rows={3}
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                placeholder="Please share any relevant medical history or current medications..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="previousTherapy"
                checked={formData.previousTherapyExperience}
                onCheckedChange={(checked) => handleInputChange("previousTherapyExperience", checked as boolean)}
              />
              <Label htmlFor="previousTherapy" className="text-sm">
                I have previous therapy or counseling experience
              </Label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Please share any specific concerns, goals, or questions you have about your counseling session..."
              />
            </div>

            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground">Consent & Agreement</h4>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consentTreatment"
                  checked={formData.consentToTreatment}
                  onCheckedChange={(checked) => handleInputChange("consentToTreatment", checked as boolean)}
                />
                <Label htmlFor="consentTreatment" className="text-sm">
                  I consent to receiving counseling/therapy services and understand that this process may involve discussing personal and sensitive topics. I understand the risks and benefits of treatment.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consentCommunication"
                  checked={formData.consentToCommunication}
                  onCheckedChange={(checked) => handleInputChange("consentToCommunication", checked as boolean)}
                />
                <Label htmlFor="consentCommunication" className="text-sm">
                  I consent to being contacted via phone, email, or text message regarding my appointment and treatment.
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto">
          <Calendar className="mr-2 h-5 w-5" />
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {stepTitles[currentStep - 1] && (
              <div className="flex items-center space-x-2">
                {(() => {
                  const IconComponent = stepTitles[currentStep - 1].icon;
                  return <IconComponent className="h-5 w-5 text-primary" />;
                })()}
                <span>{stepTitles[currentStep - 1].title}</span>
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            Step {currentStep} of {totalSteps} - Complete your appointment application
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={!formData.consentToTreatment}>
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedBookingForm;