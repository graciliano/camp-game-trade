import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { FirebaseService } from 'src/app/services/firebase.service';

import { Player } from 'src/app/model/jogador';
import { Treinador } from 'src/app/model/treinador';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private location: Location
  ) { }

  nameTreinador: string
  idJogador: number
  player: Player[]
  treinador: Treinador[]
  tentativa: number = 0

  ngOnInit() {
    this.nameTreinador = this.activatedRoute.snapshot.params.name
    this.idJogador = +this.activatedRoute.snapshot.params.id
    this.firebaseService.getPlayerById(this.idJogador).subscribe(data => {
      this.player = data.map(e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Player
        }
      })
    })
    this.firebaseService.getTreinador(this.nameTreinador).subscribe(data => {
      this.treinador = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Treinador
        }
      })
    })
  }

  comprarPlayer(player: Player) {
    let chanceContratar: number  
    if (player.fut_wiz_id > this.treinador[0].valor) {
      alert('Você não tem estalecas suficiente.')
    } else {
      chanceContratar = Math.random() * (50 - 1) + 1
      chanceContratar = chanceContratar + this.treinador[0].objetivoPatrocinio + this.treinador[0].salarioEmDia + player.fut_bin_id
      if(chanceContratar < 100) {
        alert('Jogador não aceitou a proposta e aumentou o pedido de salário.')
        player.club = player.club + (player.club / 100) * 5
        player.club = Math.round(player.club * 100) / 100
        this.firebaseService.updatePlayer(player)
        this.tentativa = ++this.tentativa
        if(this.tentativa >= 2) {
          player.traits.push(this.treinador[0].id)
          this.firebaseService.updatePlayer(player)
        }
      } else {
        player.total_stats = this.treinador[0].id
        player.total_stats_in_game = 1
        player.tradeable = false
        this.treinador[0].valor = this.treinador[0].valor - player.fut_wiz_id
        this.treinador[0].valor = Math.round(this.treinador[0].valor * 100) / 100
        this.treinador[0].salario = this.treinador[0].salario + player.club
        this.treinador[0].salario = Math.round(this.treinador[0].salario * 100) / 100
        player.rating_average = player.club
        this.firebaseService.comprarPlayer(player, this.treinador[0])
        alert('Jogador comprado.') 
        this.location.back() 
      }
    }
  }

}
