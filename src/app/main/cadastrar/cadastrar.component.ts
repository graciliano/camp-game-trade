import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';

import { Jogador, Player } from 'src/app/model/jogador';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html'
})
export class CadastrarComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder
  ) { }

  cadastraForm: FormGroup
  players: Player[]

  ngOnInit() {
    this.cadastraForm = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      nome: this.fb.control('', [Validators.required]),
      posicao: this.fb.control('', [Validators.required]),
      overall: this.fb.control('', [Validators.required]),
    })
    // this.firebaseService.getPlayers().subscribe(data => {
    //   this.players = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data() as Player
    //     }
    //   })
    // })
  }

  async cadastraPlayer(form: FormGroup) {
    let players: Player[]
    await this.firebaseService.getPlayerById(200113).subscribe(data => {
      players = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Player
        }
      })
      console.log(players.length)
      for(let player of players) {
        player.id = +form.get('id').value
        player.common_name = form.get('nome').value
        player.position = form.get('posicao').value
        player.rating = +form.get('overall').value
        player.attack_work_rate = false
        player.last_name = `https://www.fifaindex.com/static/FIFA21/images/players/10/${player.id}@2x.webp`
        player.league = 2
        player.tradeable = false
        if(player.rating <= 70) {
          player.club = player.rating / 1000 * (Math.random() * (15 - 10) + 10)
          player.fut_wiz_id = player.rating / 150 * (Math.random() * (15 - 11) + 11)
          player.club = Math.round(player.club * 100) / 100
          player.fut_wiz_id = Math.round(player.fut_wiz_id * 100) / 100
          player.rating_average = player.club
          player.fut_bin_id = 30
        } else if (player.rating >= 71 && player.rating <= 74) {
          player.club = player.rating / 1000 * (Math.random() * (19 - 16) + 16)
          player.fut_wiz_id = player.rating / 100 * (Math.random() * (20 - 15) + 15)
          player.club = Math.round(player.club * 100) / 100
          player.fut_wiz_id = Math.round(player.fut_wiz_id * 100) / 100
          player.rating_average = player.club
          player.fut_bin_id = 25
        } else if (player.rating >= 75 && player.rating <= 79) {
          player.club = player.rating / 1000 * (Math.random() * (24 - 20) + 20)
          player.fut_wiz_id = player.rating / 100 * (Math.random() * (25 - 20) + 20)
          player.club = Math.round(player.club * 100) / 100
          player.fut_wiz_id = Math.round(player.fut_wiz_id * 100) / 100
          player.rating_average = player.club
          player.fut_bin_id = 20
        } else if (player.rating >= 80 && player.rating <= 84) {
          player.club = player.rating / 1000 * (Math.random() * (35 - 25) + 25)
          player.fut_wiz_id = player.rating / 80 * (Math.random() * (34 - 25) + 25)
          player.club = Math.round(player.club * 100) / 100
          player.fut_wiz_id = Math.round(player.fut_wiz_id * 100) / 100
          player.rating_average = player.club
          player.fut_bin_id = 16
        } else if (player.rating >= 85 && player.rating <= 89) {
          player.club = player.rating / 1000 * (Math.random() * (50 - 36) + 36)
          player.fut_wiz_id = player.rating / 60 * (Math.random() * (44 - 35) + 35)
          player.club = Math.round(player.club * 100) / 100
          player.fut_wiz_id = Math.round(player.fut_wiz_id * 100) / 100
          player.rating_average = player.club
          player.fut_bin_id = 12
        } else if (player.rating >= 90 && player.rating <= 91) {
          player.club = player.rating / 1000 * (Math.random() * (80 - 51) + 51)
          player.fut_wiz_id = player.rating / 50 * (Math.random() * (55 - 45) + 45)
          player.club = Math.round(player.club * 100) / 100
          player.fut_wiz_id = Math.round(player.fut_wiz_id * 100) / 100
          player.rating_average = player.club
          player.fut_bin_id = 8
        } else if (player.rating >= 92) {
          player.club = player.rating / 1000 * (Math.random() * (120 - 100) + 100)
          player.fut_wiz_id = player.rating / 50 * (Math.random() * (70 - 56) + 56)
          player.club = Math.round(player.club * 100) / 100
          player.fut_wiz_id = Math.round(player.fut_wiz_id * 100) / 100
          player.rating_average = player.club
          player.fut_bin_id = 5
        }
        this.firebaseService.cadastraPlayer(player)
      }
    })
  }

  atualizaTentativasJanela() {
    let jogador: Jogador[]
    let i: number = 0
    for (let player of this.players) {
      this.firebaseService.getJogadorById(player.id).subscribe(data => {
        jogador = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Jogador
          }
        })
        player.name = player.common_name
        player.common_name = jogador[0].commonName
        this.firebaseService.updatePlayer(player)
        jogador = null
        console.log(player.common_name + ' ' + i)
        i++
      })
    }
  }

  arraySize() {
    console.log(this.players.length)
  }

}
