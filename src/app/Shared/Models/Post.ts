import {User} from "./User";
import firebase from "firebase/compat";
import {Comment} from "./Comment";

export interface Post {
  title: string;
  description: string;
  comments: Comment[];
  author: User;
  time: firebase.firestore.Timestamp;

  id?: string;


}
