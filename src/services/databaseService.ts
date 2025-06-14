
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Patient {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  contact_number: string;
  address: string;
  emergency_contact?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Doctor {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  specialty: string;
  license_number: string;
  contact_number: string;
  created_at?: string;
  updated_at?: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  patients?: Patient;
  doctors?: Doctor;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescription?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  patients?: Patient;
  doctors?: Doctor;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at?: string;
}

class DatabaseService {
  // Patient operations
  async getPatients(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to fetch patients');
      return [];
    }

    return data || [];
  }

  async createPatient(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient | null> {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
      .single();

    if (error) {
      console.error('Error creating patient:', error);
      toast.error('Failed to create patient');
      return null;
    }

    toast.success('Patient created successfully');
    return data;
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating patient:', error);
      toast.error('Failed to update patient');
      return null;
    }

    toast.success('Patient updated successfully');
    return data;
  }

  // Doctor operations
  async getDoctors(): Promise<Doctor[]> {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }

    return data || [];
  }

  // Appointment operations
  async getAppointments(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients (
          id,
          first_name,
          last_name,
          contact_number
        ),
        doctors (
          id,
          first_name,
          last_name,
          specialty
        )
      `)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments');
      return [];
    }

    return data || [];
  }

  async createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'patients' | 'doctors'>): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select(`
        *,
        patients (
          id,
          first_name,
          last_name,
          contact_number
        ),
        doctors (
          id,
          first_name,
          last_name,
          specialty
        )
      `)
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to create appointment');
      return null;
    }

    toast.success('Appointment scheduled successfully');
    return data;
  }

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        patients (
          id,
          first_name,
          last_name,
          contact_number
        ),
        doctors (
          id,
          first_name,
          last_name,
          specialty
        )
      `)
      .single();

    if (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
      return null;
    }

    toast.success('Appointment updated successfully');
    return data;
  }

  // Medical Records operations
  async getMedicalRecords(): Promise<MedicalRecord[]> {
    const { data, error } = await supabase
      .from('medical_records')
      .select(`
        *,
        patients (
          id,
          first_name,
          last_name
        ),
        doctors (
          id,
          first_name,
          last_name,
          specialty
        )
      `)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching medical records:', error);
      toast.error('Failed to fetch medical records');
      return [];
    }

    return data || [];
  }

  async createMedicalRecord(record: Omit<MedicalRecord, 'id' | 'created_at' | 'updated_at' | 'patients' | 'doctors'>): Promise<MedicalRecord | null> {
    const { data, error } = await supabase
      .from('medical_records')
      .insert([record])
      .select(`
        *,
        patients (
          id,
          first_name,
          last_name
        ),
        doctors (
          id,
          first_name,
          last_name,
          specialty
        )
      `)
      .single();

    if (error) {
      console.error('Error creating medical record:', error);
      toast.error('Failed to create medical record');
      return null;
    }

    toast.success('Medical record created successfully');
    return data;
  }

  // Notifications operations
  async getNotifications(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data || [];
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  }

  async getCurrentUserProfile() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  }
}

export const databaseService = new DatabaseService();
