import firebase from "firebase/compat/app";

export interface Comment {
  id: string;
  text: string;
  author: string;
  time: firebase.firestore.Timestamp;
  fileUrl?: string;
}
