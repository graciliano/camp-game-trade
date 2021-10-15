import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { FirebaseService } from 'src/app/services/firebase.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/jogador';
import { Treinador } from 'src/app/model/treinador';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html'
})

export class MercadoComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  buscaForm: FormGroup
  displayedColumns: string[] = ['foto', 'nome', 'posicao', 'valor', 'comprar'];
  players: Player[] = []
  nameTreinador: string
  treinador: Treinador[]

  async ngOnInit() {
    this.buscaForm = this.fb.group({
      busca: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    })
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

  buscaPlayer(form: FormGroup) {
    this.players = null
    this.firebaseService.getPlayersMercado(form.get('busca').value).subscribe(data => {
      this.players = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Player
        }
      })
      if(this.players.length == 0) {
        alert('Jogador não encontrado.')
      }
    })
  }

  goToDetalhes(playerId: number) {
    this.router.navigate(['detalhes', `${this.nameTreinador}`, `${playerId}`])
  }

}
