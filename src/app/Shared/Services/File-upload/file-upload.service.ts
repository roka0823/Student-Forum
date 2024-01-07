import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File, path: string): any {
    const filePath = `${path}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    return fileRef.put(file);
  }
}
