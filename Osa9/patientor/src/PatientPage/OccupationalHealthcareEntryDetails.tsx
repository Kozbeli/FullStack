import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { Segment, Icon } from "semantic-ui-react";

const OccupationalHealthCareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <div>
      <Segment>
        <b>{entry.date}</b> <Icon name="stethoscope" size='big' />
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

export default OccupationalHealthCareEntryDetails;