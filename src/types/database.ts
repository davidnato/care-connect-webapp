
export type UserRole = 'admin' | 'doctor' | 'patient';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface Patient {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  contact_number: string;
  address: string;
  emergency_contact: string;
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
  patient?: Patient;
  doctor?: Doctor;
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
  patient?: Patient;
  doctor?: Doctor;
}

export interface LabResult {
  id: string;
  patient_id: string;
  doctor_id: string;
  test_type: string;
  test_date: string;
  results: string;
  normal_range?: string;
  interpretation?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface Medication {
  id: string;
  patient_id: string;
  doctor_id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  patient?: Patient;
  doctor?: Doctor;
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

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Profile>;
      };
      patients: {
        Row: Patient;
        Insert: Omit<Patient, 'created_at' | 'updated_at'>;
        Update: Partial<Patient>;
      };
      doctors: {
        Row: Doctor;
        Insert: Omit<Doctor, 'created_at' | 'updated_at'>;
        Update: Partial<Doctor>;
      };
      appointments: {
        Row: Appointment;
        Insert: Omit<Appointment, 'created_at' | 'updated_at' | 'patient' | 'doctor'>;
        Update: Partial<Omit<Appointment, 'patient' | 'doctor'>>;
      };
      medical_records: {
        Row: MedicalRecord;
        Insert: Omit<MedicalRecord, 'created_at' | 'updated_at' | 'patient' | 'doctor'>;
        Update: Partial<Omit<MedicalRecord, 'patient' | 'doctor'>>;
      };
      lab_results: {
        Row: LabResult;
        Insert: Omit<LabResult, 'created_at' | 'updated_at' | 'patient' | 'doctor'>;
        Update: Partial<Omit<LabResult, 'patient' | 'doctor'>>;
      };
      medications: {
        Row: Medication;
        Insert: Omit<Medication, 'created_at' | 'updated_at' | 'patient' | 'doctor'>;
        Update: Partial<Omit<Medication, 'patient' | 'doctor'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'created_at' | 'updated_at'>;
        Update: Partial<Notification>;
      };
    };
  };
}
