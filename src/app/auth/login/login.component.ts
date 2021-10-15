import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) { }

  hide = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      senha: this.fb.control('', [Validators.required, Validators.minLength(5)])
    })
  }

  login(form: FormGroup) {
    this.firebaseService.login(form.controls['email'].value, form.controls['senha'].value)
  }

}
