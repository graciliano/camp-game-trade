import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase.service';

import { Treinador } from 'src/app/model/treinador';
import { Clube } from 'src/app/model/clube';
import { Patrocinio } from 'src/app/model/patrocinio';

@Component({
  selector: 'app-proposta-clube',
  templateUrl: './proposta-clube.component.html'
})
export class PropostaClubeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router) {}

  nameTreinador: string
  treinador: Treinador[]
  clube: Clube[]
  clubes: Clube[] = []
  patrocinio: Patrocinio[]

  async ngOnInit() {
    this.nameTreinador = this.activatedRoute.snapshot.params.name
    if(this.nameTreinador == undefined) {
      this.router.navigateByUrl(`/login`)
    }
    this.firebaseService.getTreinador(this.nameTreinador).subscribe(data => {
      this.treinador = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Treinador
        }
      })
      if(this.treinador[0].propostaClube == null) {
        this.router.navigateByUrl(`/home/${this.nameTreinador}`)
      } else {
        for(let index of this.treinador[0].propostaClube) {
          this.firebaseService.getClubeById(index).subscribe(data => {
            this.clube = data.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data() as Clube
              }
            })
            this.clubes.push(this.clube[0])
          })
        }
      }
    })
  }

  aceitarContrato(clube: Clube, patrocinio: Patrocinio, treinador: Treinador) {
    this.firebaseService.aceitarContrato(clube, patrocinio, treinador)
  }

  logOut() {
    this.firebaseService.logout()
  }

}
