import React from 'react';
import { Entry, HealthCheckEntry, Patient } from '../types';
import { Button, Icon } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
import { apiBaseUrl } from '../constants';
import { addEntry, useStateValue } from '../state';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const PatientDetails = (patient: Patient) => {
  const [, dispatch] = useStateValue();

  const genders = {
    male: "mars" as const,
    female: "venus" as const,
    other: "genderless" as const
  };

  type EntryFormValues = Omit<HealthCheckEntry, "id">;

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log('values:', values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      console.log('newEntry:', { newEntry });
      dispatch(addEntry(newEntry, patient.id));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  console.log('patient.entries', patient.entries);
  patient.entries.map(entry => console.log('entry:', entry));
  return (
    <div>
      <h2>
        {patient.name}
        <Icon name={genders[patient.gender]} />
      </h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      <h3>entries</h3>
      <div>
        {patient.entries.map(entry =>
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        )}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetails;