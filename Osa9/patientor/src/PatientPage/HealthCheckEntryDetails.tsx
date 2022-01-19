import React from 'react';
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import { SemanticCOLORS, Segment, Icon } from "semantic-ui-react";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  let color: SemanticCOLORS;
  switch (entry.healthCheckRating) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;
    default:
      color = 'black';
      break;
  }
  return (
    <div>
      <Segment>
        <b>{entry.date}</b> <Icon name="doctor" size='big' />
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map((code: string) =>
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          )}
        </ul>
        <Icon color={color} name="heart" />
      </Segment>
    </div>
  );
};

export default HealthCheckEntryDetails;