-- Add RLS policies for lab_results table to allow CRUD operations

-- Allow patients to insert their own lab results
CREATE POLICY "Patients can insert their own lab results" 
ON public.lab_results 
FOR INSERT 
WITH CHECK (EXISTS ( 
  SELECT 1 FROM patients 
  WHERE patients.user_id = auth.uid() AND patients.id = lab_results.patient_id
));

-- Allow doctors to insert lab results they ordered
CREATE POLICY "Doctors can insert lab results they ordered" 
ON public.lab_results 
FOR INSERT 
WITH CHECK (EXISTS ( 
  SELECT 1 FROM doctors 
  WHERE doctors.user_id = auth.uid() AND doctors.id = lab_results.doctor_id
));

-- Allow patients to update their own lab results
CREATE POLICY "Patients can update their own lab results" 
ON public.lab_results 
FOR UPDATE 
USING (EXISTS ( 
  SELECT 1 FROM patients 
  WHERE patients.user_id = auth.uid() AND patients.id = lab_results.patient_id
));

-- Allow doctors to update lab results they ordered
CREATE POLICY "Doctors can update lab results they ordered" 
ON public.lab_results 
FOR UPDATE 
USING (EXISTS ( 
  SELECT 1 FROM doctors 
  WHERE doctors.user_id = auth.uid() AND doctors.id = lab_results.doctor_id
));

-- Temporary permissive policies for development (remove in production)
CREATE POLICY "Dev: Allow all selects for lab_results" 
ON public.lab_results 
FOR SELECT 
USING (true);

CREATE POLICY "Dev: Allow all inserts for lab_results" 
ON public.lab_results 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Dev: Allow all updates for lab_results" 
ON public.lab_results 
FOR UPDATE 
USING (true);