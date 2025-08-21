-- Add RLS policies for the admins table
CREATE POLICY "Admins table is publicly readable" 
ON public.admins 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage admin records" 
ON public.admins 
FOR ALL 
USING (true);