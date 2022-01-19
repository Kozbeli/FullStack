import {
  Discharge,
  Entry,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  SickLeave
} from './types';


const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing name');
  }
  return string;
};

const isEntry = (entry: any): entry is Entry => {
  const hospital: boolean = entry.type === 'Hospital';
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean = entry.type === "OccupationalHealthcare";
  return hospital || healthCheck || occupationalHealthcare;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isEntry(entry)) {
    throw new Error('Incorrect or missing entry!');
  }
  return entry;
};

const parseEntries = (entries: any): Entry[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!entries) return entries;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (entries.forEach((entry: any) => !isEntry(entry))) {
    throw new Error('Incorret or missing entries:' + entries);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};

const parseArrayOfStrings = (strings: any): string[] => {
  if (!strings) return [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (strings.forEach((string: any) => !isString(string))) {
    throw new Error('Incorrect or missing diagnoses:' + strings);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return strings;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave.startDate || !sickLeave.endDate) {
    throw new Error('Incorrect or missing sickLeaveDates: ' + sickLeave);
  }

  const startDate = parseDate(sickLeave.startDate);
  const endDate = parseDate(sickLeave.endDate);

  return {
    startDate,
    endDate
  };
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge.date || !discharge.criteria) {
    throw new Error('Incorrect or missing discharge details');
  }
  const date = parseDate(discharge.date);
  const criteria = parseString(discharge.criteria);
  return {
    date,
    criteria
  };
};

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries) || [],
  };

  return newPatient;
};

export const toNewEntry = (object: any): NewEntry => {
  console.log('object:', object);
  const entry = parseEntry(object);
  console.log('entry:', entry);
  switch (entry.type) {
    case "HealthCheck":
      const newHealthCheckEntry: NewEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseArrayOfStrings(object.diagnosisCodes),
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return newHealthCheckEntry;
    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: NewEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseArrayOfStrings(object.diagnosisCodes),
        employerName: parseString(object.employerName),
        type: "OccupationalHealthcare",
        sickLeave: parseSickLeave(object.sickLeave)
      };
      return newOccupationalHealthcareEntry;
    case "Hospital":
      const newHospitalEntry: NewEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseArrayOfStrings(object.diagnosisCodes),
        type: "Hospital",
        discharge: parseDischarge(object.discharge)
      };
      return newHospitalEntry;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default toNewPatient;