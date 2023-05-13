import {User} from "./User";
import firebase from "firebase/compat/app";

export interface Comment {

  text: string;
  author: User;
  time: firebase.firestore.Timestamp;
}
