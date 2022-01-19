import express from 'express';
import patientService from '../services/patientService';
import { NewPatient, Patient } from '../types';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {

  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log('req.body:', req.body);
  try {
    const patientToChange = patientService.findById(String(req.params.id));
    console.log('patientToChange:', patientToChange);
    const newEntry = toNewEntry(req.body);
    console.log('newEntry:', newEntry);
    if (patientToChange && newEntry) {
      const entry = patientService.addNewEntry(patientToChange, newEntry);
      console.log('entry:', entry);
      res.json(entry);
    }
  } catch (error) {
    res.status(400);
  }
});

export default router;