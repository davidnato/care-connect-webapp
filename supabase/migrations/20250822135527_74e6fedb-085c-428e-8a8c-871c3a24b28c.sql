-- Create medications table
CREATE TABLE public.medications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  notes text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'discontinued')),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on medications table
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for medications
CREATE POLICY "Patients can view their own medications" ON public.medications
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.patients 
    WHERE patients.id = medications.patient_id 
    AND patients.user_id = auth.uid()
  )
);

CREATE POLICY "Doctors can view medications they prescribed" ON public.medications
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.doctors 
    WHERE doctors.id = medications.doctor_id 
    AND doctors.user_id = auth.uid()
  )
);

CREATE POLICY "Doctors can insert medications" ON public.medications
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.doctors 
    WHERE doctors.id = medications.doctor_id 
    AND doctors.user_id = auth.uid()
  )
);

CREATE POLICY "Doctors can update medications they prescribed" ON public.medications
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.doctors 
    WHERE doctors.id = medications.doctor_id 
    AND doctors.user_id = auth.uid()
  )
);

-- Create trigger for updating updated_at
CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON public.medications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();