import { Clube } from './clube'

export class Treinador {
  id: number
  nome: string
  login: string
  idClube: number
  idPatrocinio: number
  nivel: number
  valor: number
  salario: number
  propostaClube: number[]
  clube: Clube
  salarioEmDia: number
  objetivoPatrocinio: number
}