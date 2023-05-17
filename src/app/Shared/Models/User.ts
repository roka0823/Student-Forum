import {Subject} from "./Subject";

export interface User {
  id: string;
  email: string;
  name: {
    firstName: string;
    lastName: string;
  }
  nickName: string;
  major: string;
  semester: string;
  friends: User[];
  subjects: Subject[];
  badges: string[];
}
