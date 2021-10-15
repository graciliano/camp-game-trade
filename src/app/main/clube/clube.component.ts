import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

import { Player } from '../../model/jogador'
import { ActivatedRoute } from '@angular/router';
import { Treinador } from 'src/app/model/treinador';

@Component({
  selector: 'app-clube',
  templateUrl: './clube.component.html',
})
export class ClubeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService) {}

  players: Player[]
  treinador: Treinador[]
  nameTreinador: string
  aumetarSalario: string

  async ngOnInit() {
    this.nameTreinador = this.activatedRoute.snapshot.params.name
    await this.firebaseService.getTreinador(this.nameTreinador).subscribe(data => {
      this.treinador = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Treinador
        }
      })
      this.firebaseService.getPlayerByTreinador(this.treinador[0].id).subscribe(data => {
        this.players = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Player
          }
        })
      })
    })
  }

  colocarAvenda(player: Player) {
    player.tradeable = true
    this.firebaseService.updatePlayer(player)
    alert('Jogador colocado no mercado de transerência.')
  }

  renovarContrato(player: Player) {
    let chanceContratar: number
    if (player.fut_wiz_id > this.treinador[0].valor) {
      alert('Você não tem estalecas suficiente.')
    } else {
      chanceContratar = Math.random() * (50 - 1) + 1
      chanceContratar = Math.round(chanceContratar * 1) / 1
      chanceContratar = chanceContratar + this.treinador[0].objetivoPatrocinio + this.treinador[0].salarioEmDia + player.fut_bin_id
      console.log(chanceContratar)
      if(chanceContratar < 100) {
        alert('Jogador não aceitou a proposta e aumentou o pedido de salário.')
        player.club = player.club + (player.club / 100) * 5
        player.club = Math.round(player.club * 100) / 100
        // player.attack_work_rate = false
        this.firebaseService.updatePlayer(player)
      } else {
        player.total_stats = this.treinador[0].id
        player.total_stats_in_game = ++player.total_stats_in_game
        player.tradeable = false
        this.treinador[0].valor = this.treinador[0].valor - player.fut_wiz_id
        this.treinador[0].valor = Math.round(this.treinador[0].valor * 100) / 100
        this.treinador[0].salario = this.treinador[0].salario - player.rating_average + player.club
        player.rating_average = player.club
        this.firebaseService.comprarPlayer(player, this.treinador[0])
        alert('Contrato renovado.')
      }
    }
  }

  dispensarPlayer() {

  }

}