import { NgModule } from '@angular/core'

import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatTableModule } from '@angular/material/table'
import { MatRadioModule } from '@angular/material/radio'

const materialImports = [
  MatGridListModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatTableModule,
  MatRadioModule
]

@NgModule({
  imports: [materialImports],
  exports: [materialImports]
})
export class MaterialModule {}