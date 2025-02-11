import { CoursePart } from '../types';

const courseParts: CoursePart[] = [
  {
    "name": "Fundamentals",
    "exerciseCount": 10,
    "description": "This is the leisured course part",
    "type": "normal"
  },
  {
    "name": "Advanced",
    "exerciseCount": 7,
    "description": "This is the harded course part",
    "type": "normal"
  },
  {
    "name": "Using props to pass data",
    "exerciseCount": 7,
    "groupProjectCount": 3,
    "type": "groupProject"
  },
  {
    "name": "Deeper type usage",
    "exerciseCount": 14,
    "description": "Confusing description",
    "exerciseSubmissionLink": "https://fake-exercise-submit.made-up-url.dev",
    "type": "submission"
  }
]

export default courseParts;