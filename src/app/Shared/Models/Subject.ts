import {Post} from "./Post";

export interface Subject {

  id?: string;
  name: string;
  joinedUsers: number;
  posts: Post[];
  recommended: string;
  mandatory: string;

}
