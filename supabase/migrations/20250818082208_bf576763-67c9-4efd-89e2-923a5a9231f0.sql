-- Add additional fields to bookings table for comprehensive information capture
ALTER TABLE public.bookings 
ADD COLUMN age INTEGER,
ADD COLUMN gender TEXT,
ADD COLUMN occupation TEXT,
ADD COLUMN emergency_contact_name TEXT,
ADD COLUMN emergency_contact_phone TEXT,
ADD COLUMN medical_history TEXT,
ADD COLUMN previous_therapy_experience BOOLEAN DEFAULT false,
ADD COLUMN referral_source TEXT,
ADD COLUMN preferred_counselor_gender TEXT,
ADD COLUMN session_type TEXT DEFAULT 'in-person',
ADD COLUMN insurance_provider TEXT,
ADD COLUMN payment_method TEXT,
ADD COLUMN consent_to_treatment BOOLEAN DEFAULT false,
ADD COLUMN consent_to_communication BOOLEAN DEFAULT false;

-- Add additional fields to contact_messages table
ALTER TABLE public.contact_messages
ADD COLUMN subject TEXT,
ADD COLUMN urgency_level TEXT DEFAULT 'normal',
ADD COLUMN follow_up_required BOOLEAN DEFAULT true,
ADD COLUMN assigned_to TEXT,
ADD COLUMN response_sent_at TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX idx_bookings_service_type ON public.bookings(service_type);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_preferred_date ON public.bookings(preferred_date);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_contact_messages_urgency ON public.contact_messages(urgency_level);