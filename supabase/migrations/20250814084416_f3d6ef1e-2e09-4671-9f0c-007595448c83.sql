-- Create admin settings table
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT,
  preferred_contact TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TIME,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_settings (publicly readable, admin writable)
CREATE POLICY "Admin settings are publicly readable" 
ON public.admin_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage settings" 
ON public.admin_settings 
FOR ALL 
USING (true);

-- Create policies for contact_messages (publicly insertable, admin readable)
CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can read all contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (true);

-- Create policies for bookings (publicly insertable, admin readable)
CREATE POLICY "Anyone can insert bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can read all bookings" 
ON public.bookings 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (true);

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value, setting_type) VALUES
('site_title', 'Bridge to Renewal Counseling & Training Centre', 'text'),
('site_subtitle', 'Empowering minds, healing hearts, building resilience', 'text'),
('hero_title', 'Professional Counseling & Training Excellence', 'text'),
('hero_subtitle', 'Comprehensive mental health services and accredited training programs for individuals, families, and communities in Kenya', 'text'),
('vision_statement', 'To be a leading center of excellence in mental health, counseling and professional training, empowering individuals and communities towards holistic well-being and resilience.', 'textarea'),
('mission_statement', 'To provide high-quality, accessible, and professional counseling services while equipping individuals with the necessary skills and knowledge to become competent mental health professionals. We aim to foster emotional wellness, reduce stigma, and promote mental health awareness through education, research, and community outreach.', 'textarea'),
('contact_phone', '+254 721 683232', 'text'),
('contact_email', 'info@brctc.co.ke', 'text'),
('contact_address', 'Utawala, Nairobi County, Kenya', 'text'),
('office_hours', 'Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM', 'text');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;