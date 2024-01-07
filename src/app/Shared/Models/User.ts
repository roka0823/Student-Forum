import {Notification} from "./Notification";

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
  friends: string[];
  subjects: string[];
  badges: string[];
  notifications: Notification[];
  isAdmin: boolean;
}
