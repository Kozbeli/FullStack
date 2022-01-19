import React from 'react';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <div>
      <Segment>
        <b>{entry.date}</b> <Icon name="hospital" size='big' />
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map((code: string) =>
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          )}
        </ul>
      </Segment>
    </div>
  );
};

export default HospitalEntryDetails;