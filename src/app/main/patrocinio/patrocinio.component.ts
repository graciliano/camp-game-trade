import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase.service';

import { Treinador } from 'src/app/model/treinador';
import { Player } from 'src/app/model/jogador';

@Component({
  selector: 'app-patrocinio',
  templateUrl: './patrocinio.component.html'
})
export class PatrocinioComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) { }

    nameTreinador: string
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
    this.firebaseService.getListaVenda().subscribe(data => {
      this.players = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Player
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
      chanceContratar = Math.round(chanceContratar * 1) / 1
      chanceContratar = chanceContratar + this.treinador[0].objetivoPatrocinio + this.treinador[0].salarioEmDia + player.fut_bin_id
      if(chanceContratar < 100) {
        alert('Jogador não aceitou a proposta e aumentou o pedido de salário.')
        player.club = player.club + (player.club / 100) * 5
        player.club = Math.round(player.club * 100) / 100
        this.firebaseService.updatePlayer(player)
      } else {
        let treinadorVenda: Treinador[]
        this.firebaseService.getTreinadorById(player.total_stats).subscribe(data => {
          treinadorVenda = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data() as Treinador
            }
          })
          treinadorVenda[0].valor = treinadorVenda[0].valor + player.fut_wiz_id
          this.firebaseService.getPlayersChancesContratar
        })
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
      }
    }
  }

}
