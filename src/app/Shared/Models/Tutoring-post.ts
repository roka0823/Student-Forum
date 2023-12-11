import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const firestore = firebase.firestore();


export interface TutoringPost {
  id: string;
  want: string;
  topic: string;
  offer: string;
  description: string;
  author: string;
  time: firebase.firestore.Timestamp;
  active: boolean;
}
