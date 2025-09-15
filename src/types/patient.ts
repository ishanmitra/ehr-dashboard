export interface Patient {
  id: string | number;
  doctor: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  gender: 'Male' | 'Female' | 'Do Not Specify';
}

export interface PatientFormData extends Omit<Patient, 'id'> {
  id?: string | number;
}