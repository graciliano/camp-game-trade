export class Jogador {
  chance: number
  clube: string
  commonName: string
  composure: number
  contrata: string[]
  id: number
  imageFace: string
  payment: number
  position: string
  value: number
}

export class Player {
  id: number
  resource_id: number
  name: string
  age: number
  resource_base_id: number
  fut_bin_id: number
  fut_wiz_id: number
  first_name: string
  last_name: string
  common_name: string
  height: number
  weight: number
  birth_date: string
  league: number
  nation: number
  club: number
  rarity: number
  traits: number[]
  specialities: []
  tradeable: boolean
  position: string
  skill_moves: number
  weak_foot: number
  foot: string
  attack_work_rate: boolean
  defense_work_rate: number
  total_stats: number
  total_stats_in_game: number
  rating: number
  rating_average: number
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physicality: number
  pace_attributes: {
    acceleration: number
    sprint_speed: number
  }
  shooting_attributes: {
    positioning: number
    finishing: number
    shot_power: number
    long_shots: number
    volleys: number
    penalties: number
  }
  passing_attributes: {
    vision: number
    crossing: number
    free_kick_accuracy: number
    short_passing: number
    long_passing: number
    curve: number
  }
  dribbling_attributes: {
    agility: number
    balance: number
    reactions: number
    ball_control: number
    dribbling: number
    composure: number
  }
  defending_attributes: {
    interceptions: number
    heading_accuracy: number
    standing_tackle: number
    sliding_tackle: number
  }
  physicality_attributes: {
    jumping: number
    stamina: number
    strength: number
    aggression: number
  }
  goalkeeper_attributes: {
    diving: number
    handling: number
    kicking: number
    positioning: number
    reflexes: number
  }
}