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
  tableName: 'transversal_axes',
  timestamps: true,
})
export default class TransversalAxis extends Model {
  @AllowNull(false)
  @ForeignKey(() => Planning)
  @Column({
    type: DataType.INTEGER,
  })
  declare planningId: number

  @BelongsTo(() => Planning)
  declare planning: Planning

  // 2.1.1 Antecedentes
  @Column({
    type: DataType.TEXT,
  })
  declare antecedentes: string

  // 2.1.2 Laterales
  @Column({
    type: DataType.TEXT,
  })
  declare laterales: string

  // 2.1.3 Subsecuentes
  @Column({
    type: DataType.TEXT,
  })
  declare subsecuentes: string

  // 2.2.1 Compromiso social y sustentabilidad
  @Column({
    type: DataType.TEXT,
  })
  declare socialCommitment: string

  // 2.2.2 Perspectiva, inclusión y erradicación de la violencia de género
  @Column({
    type: DataType.TEXT,
  })
  declare genderPerspective: string

  // 2.2.3 Internacionalización del IPN
  @Column({
    type: DataType.TEXT,
  })
  declare internationalization: string
}
