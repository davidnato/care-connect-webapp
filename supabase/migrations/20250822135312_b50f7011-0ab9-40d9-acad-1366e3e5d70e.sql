-- Fix infinite recursion in RLS policies by creating security definer functions

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Recreate policies using the security definer function
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.get_current_user_role() = 'admin');

-- Add missing RLS policies for full functionality
CREATE POLICY "Allow authenticated users to insert patients" ON public.patients
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to update their patients" ON public.patients  
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to insert appointments" ON public.appointments
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update appointments" ON public.appointments
FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to insert medical records" ON public.medical_records
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update medical records" ON public.medical_records
FOR UPDATE USING (true);