import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service'

import { Treinador } from 'src/app/model/treinador';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  user: any
  nameTreinador: Treinador[]

  ngOnInit(): void {
    this.user = this.firebaseService.isLoggedIn()
    this.nameTreinador = this.activatedRoute.snapshot.params.name
    if (this.user) {
      this.router.navigateByUrl(`/propostaclube/${this.nameTreinador}`)
    } else {
      this.router.navigateByUrl('/login')
    }
  }

}
