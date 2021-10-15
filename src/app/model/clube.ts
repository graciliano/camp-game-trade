import { Patrocinio } from './patrocinio'

export class Clube {
  id: number
  name: string
  league: number
  imagem: string
  nivel: number
  valor: number
  idTreinador: number
  idPatrocinio: number
  patrocinio: Patrocinio
  // patrocinio: {
  //   id: number
  //   nivel: number
  //   nome: string
  //   objetivo: string
  //   valor: number
  // }
}