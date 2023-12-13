import firebase from "firebase/compat";

export interface Post {
  title: string;
  description: string;
  comments: string[];
  author: string;
  authorLastName: string;
  authorFirstName: string;
  time: firebase.firestore.Timestamp;
  subject: string;
  id: string;
  fileUrl?: string;
}
