-- Update RLS policies to allow admin access without Supabase authentication
-- For contact_messages table
DROP POLICY IF EXISTS "Authenticated admins can read contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated admins can update contact messages" ON public.contact_messages;

CREATE POLICY "Admins can read contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (true);

-- For bookings table
DROP POLICY IF EXISTS "Authenticated admins can read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated admins can update bookings" ON public.bookings;

CREATE POLICY "Admins can read bookings" 
ON public.bookings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (true);