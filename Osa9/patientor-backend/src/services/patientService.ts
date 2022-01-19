import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  NewPatient,
  PublicPatient,
  Patient,
  Entry,
  NewEntry
} from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

const addNewEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    ...entry,
    id: uuid()
  };

  patient.entries.push(newEntry);

  return newEntry;
};

const addPatient = (entry: NewPatient): Patient => {

  const newPatient = {
    ...entry,
    id: uuid()
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addNewEntry
};