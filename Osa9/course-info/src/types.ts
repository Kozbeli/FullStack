// new types
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type:string;
}

export interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
