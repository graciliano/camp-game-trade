import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase.service';

import { Clube } from 'src/app/model/clube';
import { Treinador } from '../../model/treinador'
import { Player } from 'src/app/model/jogador';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  nameTreinador: string
  clube: Clube[]
  treinador: Treinador[]
  players: Player[]

  async ngOnInit() { 
    this.nameTreinador = this.activatedRoute.snapshot.params.name
    await this.firebaseService.getTreinador(this.nameTreinador).subscribe(data => {
      this.treinador = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Treinador
        }
      })
    })
  }

  goToMercadoRoute() {
    this.router.navigateByUrl(`/mercado/${this.treinador[0].login}`)
  }
  
  goToClubeRoute() {
    this.router.navigateByUrl(`/clube/${this.nameTreinador}`)
  }
  
  goToAvendaRoute() {
    this.router.navigateByUrl(`/patrocinio/${this.nameTreinador}`)
  }

  logOut() {
    this.firebaseService.logout()
  }

  updatePlayers() {
    this.firebaseService.updatePlayers(this.players)
  }

}
