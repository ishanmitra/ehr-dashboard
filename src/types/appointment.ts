export interface Appointment {
  id: string | number;
  doctor: string;
  patient: string;
  office: string;
  exam_room: string;
  scheduled_time: string;
}

export interface AppointmentFormData extends Omit<Appointment, 'id'> {
  id?: string | number;
}