import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { AngularFirestore } from '@angular/fire/firestore'
import { User } from 'firebase'

import { Player } from '../model/jogador';
import { Clube } from '../model/clube'
import { Patrocinio } from '../model/patrocinio'
import { AngularFireAuth } from '@angular/fire/auth';
import { Treinador } from '../model/treinador';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: User
  players: Player[]
  patrocinios: Patrocinio[]
  clubs: Clube[]
  treinadores: Treinador[]

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth) 
  { 
    this.fireAuth.authState.subscribe(user => {
      if(user) {
        this.user = user
        localStorage.setItem('user', JSON.stringify(this.user))
      } else {
        localStorage.setItem('user', null)
      }
    })
  }

  //AUTH SECTION
  async login(email: string, password: string) {
    try {
      var result = await this.fireAuth.signInWithEmailAndPassword(email, password)
      let index = email.lastIndexOf('@')
      let nameTreinador = email.slice(0, index)
      this.router.navigateByUrl(`/auth/${nameTreinador}`)
    } catch(e) {
      alert(e)
    }
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user
  }

  async logout() {
    await this.fireAuth.signOut()
    localStorage.removeItem('user')
    this.router.navigate([''])
  }

  //TREINADOR SECTION
  getTreinador(nameTreinador: string) {
    return this.firestore.collection('treinadores', ref => ref.where('login', '==', nameTreinador).limit(1)).snapshotChanges()
  }

  getTreinadorById(id: number) {
    return this.firestore.collection('treinadores', ref => ref.where('id', '==', id).limit(1)).snapshotChanges()
  }
  
  updateTreinador(treinador: Treinador) {
    return this.firestore.doc('treinadores/' + treinador.id).update(treinador)
  }

  //PLAYERS SECTION
  getPlayers() {
    return this.firestore.collection('playersFifa21').snapshotChanges()
  }

  getPlayerById(id: number) { 
    return this.firestore.collection('playersFifa21', ref => ref.where('id', '==', id).limit(1)).snapshotChanges()
  }

  getJogadorById(id: number) { 
    return this.firestore.collection('jogadores', ref => ref.where('id', '==', id).limit(1)).snapshotChanges()
  }
  
  getPlayerByTreinador(id: number) {
    return this.firestore.collection('playersFifa21', ref => ref.where('total_stats', '==', id)).snapshotChanges()
  }

  getPlayersMercado(name: string) {
    return this.firestore.collection('playersFifa21', ref => ref.where('common_name', '>=', name).where('common_name', '<=', name+'\uf8ff')).snapshotChanges()
  }

  getPlayersChancesContratar() {
    return this.firestore.collection('playersFifa21', ref => ref.where('traits', '!=', null)).snapshotChanges()
  }

  getListaVenda() {
    return this.firestore.collection('playersFifa21', ref => ref.where('tradeable', '==', true)).snapshotChanges()
  }

  comprarPlayer(player: Player, treinador: Treinador) {
    this.firestore.doc('playersFifa21/' + player.id).update(player);
    this.firestore.doc('treinadores/' + treinador.id).update(treinador);
  }
   
  updatePlayer(player: Player){
    this.firestore.doc('playersFifa21/' + player.id).update(player)
  }

  updatePlayers(players: Player[]){
    for(let player of players) {
      if(player.league != 2) {
        player.league = 2
      }
      this.firestore.doc('playersFifa21/' + player.id).update(player);
    }
  }
   
  cadastraPlayer(player: Player) {
    this.firestore.collection('playersFifa21').doc(player.id.toString()).set(player)
  }
  //CLUBES SECTION
  getClubes() {
    return this.firestore.collection('clubs').snapshotChanges()
  }
  
  getClubeById(id: number) {
    return this.firestore.collection('clubs', ref => ref.where('id', '==', id).limit(1)).snapshotChanges()
  }

  getClubesNivel() {
    return this.firestore.collection('clubs', ref => ref.where('nivel', '==', 4)).snapshotChanges()
  }

  updateClubes(clubs: Clube[]) {
    for (let clube of clubs) {
      if(clube.nivel >= 4) {
        clube.valor = Math.random() * (200 - 120) + 120
        clube.valor = Math.round(clube.valor * 100) / 100
      }
      this.firestore.doc('clubs/' + clube.id).update(clube);
    }
  }
  
  async updateClubesPatrocinio(clubs: Clube[]) {
    let patrocinio: Patrocinio[]
    for (let clube of clubs) {
      await this.getPatrociniosById(clube.idPatrocinio).subscribe(data => {
        patrocinio = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Patrocinio
          }
        })
        clube.patrocinio = patrocinio[0]
        this.firestore.doc('clubs/' + clube.id).update(clube);
      })
    }
  }

  //PATROCINIO SECTION
  getPatrocinios() {
    return this.firestore.collection('patrocinio').snapshotChanges()
  }

  getPatrociniosById(id: number) {
    return this.firestore.collection('patrocinio', ref => ref.where('id', '==', id).limit(1)).snapshotChanges()
  }
  
  updatePatrocinio(patrocinios: Patrocinio[]) {
    for (let patrocinio of patrocinios) {
      if(patrocinio.nivel == 1) {
        patrocinio.valor = Math.random() * (50 - 25) + 25
        patrocinio.valor = Math.round(patrocinio.valor * 100) / 100
      } else if (patrocinio.nivel == 2) {
        patrocinio.valor = Math.random() * (150 - 50) + 50
        patrocinio.valor = Math.round(patrocinio.valor * 100) / 100
      } else if (patrocinio.nivel == 3) {
        patrocinio.valor = Math.random() * (400 - 200) + 200
        patrocinio.valor = Math.round(patrocinio.valor * 100) / 100
      }
      this.firestore.doc('patrocinio/' + patrocinio.id).update(patrocinio);
    }
  }
  
  //GENERAL SECTION

  // updateImage(players: Player[]){
  //   // delete players.id;
  //   for (let i = 0; i < players.length; i++) {
  //     players[i].last_name = `https://www.fifaindex.com/static/FIFA21/images/players/10/${players[i].id}@2x.webp`
  //     this.firestore.doc('playersFifa21/' + players[i].id).update(players[i]);
  //     console.log(players[i].id)
  //   }
  // }

  aceitarContrato(clube: Clube, patrocinio: Patrocinio, treinador: Treinador) {
    treinador.idClube = clube.id
    treinador.idPatrocinio = clube.patrocinio.id
    treinador.propostaClube = null
    treinador.valor = clube.valor + patrocinio.valor
    clube.idTreinador = treinador.id
    treinador.clube = clube
    this.firestore.doc('treinadores/' + treinador.id).update(treinador)
    this.firestore.doc('clubs/' + clube.id).update(clube)
  }

  async lancarPropostasClubes(clubs: Clube[]) {
    let index;
    await this.firestore.collection('treinadores').snapshotChanges().subscribe(data => {
      this.treinadores = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Treinador
        }
      })
      for(let treinador of this.treinadores) {
        for(let i=0; i < 4; i++) {
          index = Math.random() * (430 - 0) + 0
          index = Math.round(index * 1) / 1
          console.log(index)
          treinador.propostaClube.push(clubs[index].id)
        }
        this.firestore.doc('treinadores/' + treinador.id).update(treinador)
      }
    })
  }

  async lancarPropostasPatrocinio() {
    // await this.firestore.collection('clubs').snapshotChanges().subscribe(data => {
    //   this.clubs = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data() as Clube
    //     }
    //   })
    // })
  }

}


/* SAMPLE COD 

async getClubsApi() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'key': 'x-api-key',
        'value': '073a9e08-1f67-4f5d-a8a5-830f863e49c5',
        'accept': 'application/json',
        'X-AUTH-TOKEN': '073a9e08-1f67-4f5d-a8a5-830f863e49c5'
      }),
      body: ({
        email: 'marty.graciliano@gmail.com',
        user_password: 'Graci@13909',
        token: 'a2ebac37-44e4-44d9-a493-5e021d547107'
      })
    }
    await this.httpClient.get(`https://futdb.app/api/clubs?page=42`, httpOptions).subscribe((data: any[]) => {
      this.clubs = data['items'];
      for (let club of this.clubs) {
        this.firestore.collection('clubs').doc(club.id.toString()).set(club)
      }
    })
    console.log('42')
  }

console.log(this.players.length)
  for(let i=0; i < this.players.length; i++) {
    this.firestore.collection('jogadores', ref => ref.where('id', '==', this.players[i].id)).snapshotChanges().subscribe(data => {
      this.jogadores = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Jogador
        }
      })
      
      this.players[i].common_name = this.jogadores[0].commonName
      console.log(this.jogadores[0].commonName)
      this.firestore.doc('playersFifa21/' + this.players[i].id).update(this.players[i]);
      //LINHA QUE ADICIONA CUSTOM ID NO FIREBASE
      // this.firestore.collection('playersFifa21').doc(player.id.toString()).set(player)
      this.jogadores = []
    })
  }

  // API REST

  getPlayersApi() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'key': 'x-api-key',
        'value': '073a9e08-1f67-4f5d-a8a5-830f863e49c5',
        'accept': 'application/json',
        'X-AUTH-TOKEN': '073a9e08-1f67-4f5d-a8a5-830f863e49c5'
      }),
      body: ({
        email: 'marty.graciliano@gmail.com',
        user_password: 'Graci@13909',
        token: 'a2ebac37-44e4-44d9-a493-5e021d547107'
      })
    }
    this.httpClient.get(`https://futdb.app/api/players?page=360`, httpOptions).subscribe(async (data: any[]) => {
      this.jogadores = data['items'];
      console.log('Página 360')
      for await (let jogador of this.jogadores){
        if (jogador.rating <= 93 && jogador.rating >= 67 && jogador.rarity != 12) {
          jogador.first_name = " "
          jogador.last_name = " "
          jogador.tradeable = false
          if(jogador.rating <= 70) {
            jogador.club = jogador.rating / 1000 * (Math.random() * (15 - 10) + 10)
            jogador.fut_wiz_id = jogador.rating / 150 * (Math.random() * (15 - 11) + 11)
            jogador.fut_bin_id = 80
          } else if (jogador.rating >= 71 && jogador.rating <= 74) {
            jogador.club = jogador.rating / 1000 * (Math.random() * (19 - 16) + 16)
            jogador.fut_wiz_id = jogador.rating / 100 * (Math.random() * (20 - 15) + 15)
            jogador.fut_bin_id = 70
          } else if (jogador.rating >= 75 && jogador.rating <= 79) {
            jogador.club = jogador.rating / 1000 * (Math.random() * (24 - 20) + 20)
            jogador.fut_wiz_id = jogador.rating / 100 * (Math.random() * (25 - 20) + 20)
            jogador.fut_bin_id = 60
          } else if (jogador.rating >= 80 && jogador.rating <= 84) {
            jogador.club = jogador.rating / 1000 * (Math.random() * (35 - 25) + 25)
            jogador.fut_wiz_id = jogador.rating / 80 * (Math.random() * (34 - 25) + 25)
            jogador.fut_bin_id = 50
          } else if (jogador.rating >= 85 && jogador.rating <= 89) {
            jogador.club = jogador.rating / 1000 * (Math.random() * (50 - 36) + 36)
            jogador.fut_wiz_id = jogador.rating / 60 * (Math.random() * (44 - 35) + 35)
            jogador.fut_bin_id = 25
          } else if (jogador.rating >= 90 && jogador.rating <= 91) {
            jogador.club = jogador.rating / 1000 * (Math.random() * (80 - 51) + 51)
            jogador.fut_wiz_id = jogador.rating / 50 * (Math.random() * (55 - 45) + 45)
            jogador.fut_bin_id = 10
          } else if (jogador.rating >= 92) {
            jogador.club = jogador.rating / 1000 * (Math.random() * (120 - 100) + 100)
            jogador.fut_wiz_id = jogador.rating / 50 * (Math.random() * (70 - 56) + 56)
            jogador.fut_bin_id = 10
          }
          this.firestore.collection('players').add(jogador)
          console.log(jogador.common_name + " " + jogador.rating + ' added')
        } else {
          console.log(jogador.common_name + " " + jogador.rating + ' -----')
        }
      }
      this.jogadores = []
    })
  }

*/