export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type PublicPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender
  occupation: string;
  entries: Entry[]
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  HospitalEntry |
  OccupationalHealthcareEntry |
  HealthCheckEntry;

export type NewEntry =
  Omit<HospitalEntry, 'id'> |
  Omit<OccupationalHealthcareEntry, 'id'> |
  Omit<HealthCheckEntry, 'id'>;