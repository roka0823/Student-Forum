import {Component} from '@angular/core';
import {AuthenticationService} from "../../../Shared/Services/Authentication/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {User} from "../../../Shared/Models/User";
import {Router} from "@angular/router";
import {FileUploadService} from "../../../Shared/Services/File-upload/file-upload.service";
import {VAPID_KEY} from "@angular/fire/compat/messaging";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public link = "https://firebasestorage.googleapis.com/v0/b/diak-forum.appspot.com/o/ASZF%2Fadatkezel%C3%A9si%20%C3%A9s%20tartalomkezel%C3%A9si%20szab%C3%A1lyza_p%C3%A9lda.pdf?alt=media&token=2926b7aa-d79b-4af7-8941-abe58d14bf71"

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    name: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    }),
    rePassword: new FormControl(''),
    major: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    aszf: new FormControl(false, Validators.required)
  });

  constructor(private auth: AuthenticationService,
              private userService: UserService,
              private router: Router) {
  }

  onSubmit() {
    if (this.registerForm.get('aszf')?.value === true) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      if (email && password) {
        this.auth.register(email, password).then(cred => {
          const user: User = {
            id: cred.user?.uid as string,
            email: this.registerForm.get('email')?.value as string,
            name: {
              firstName: this.registerForm.get('name.firstName')?.value as string,
              lastName: this.registerForm.get('name.lastName')?.value as string
            },
            nickName: '',
            major: this.registerForm.get('major')?.value as string,
            semester: this.registerForm.get('semester')?.value as string,
            friends: [],
            subjects: [],
            badges: ['Beta Tester'],
            notifications: []
          };
          this.userService.create(user).then(_ => {
            this.router.navigateByUrl('/profile')
          }).catch(error => {
            console.error(error);
          })
        }).catch(error => {
          console.error(error);
        });
      }
    } else {
      window.alert('Az adatkezelés elfogadása kötelező')
    }
  }

}
