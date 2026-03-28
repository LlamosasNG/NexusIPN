import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import Planning from './Planning'

@Table({
  tableName: 'references',
  timestamps: true,
})
export default class Reference extends Model {
  @AllowNull(false)
  @ForeignKey(() => Planning)
  @Column({
    type: DataType.INTEGER,
  })
  declare planningId: number

  @BelongsTo(() => Planning)
  declare planning: Planning

  // 4.1 Texto de la referencia (formato APA)
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  declare text: string

  // 4.2 Unidades temáticas asociadas (checkbox array)
  @Column({
    type: DataType.JSONB,
  })
  declare thematicUnits: boolean[]

  // 4.3 Tipo (B = Básica, S = Sugerida, I = Internet, C = Complementaria)
  @Column({
    type: DataType.JSONB,
  })
  declare types: {
    B: boolean
    S: boolean
    I: boolean
    C: boolean
  }
}
