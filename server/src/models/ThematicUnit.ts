import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import Planning from './Planning'
import SessionActivity from './SessionActivity'

@Table({
  tableName: 'thematic_units',
  timestamps: true,
})
export default class ThematicUnit extends Model {
  @AllowNull(false)
  @ForeignKey(() => Planning)
  @Column({
    type: DataType.INTEGER,
  })
  declare planningId: number

  @BelongsTo(() => Planning)
  declare planning: Planning

  // 3.5 Número de unidad temática (I, II, III...)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare unitNumber: number

  // 3.1 Unidad de aprendizaje
  @Column({
    type: DataType.STRING,
  })
  declare learningUnit: string

  // 3.2 Propósito u objetivo general
  @Column({
    type: DataType.TEXT,
  })
  declare generalObjective: string

  // 3.3 Estrategia de aprendizaje
  @Column({
    type: DataType.TEXT,
  })
  declare learningStrategy: string

  // 3.4 Métodos de enseñanza
  @Column({
    type: DataType.TEXT,
  })
  declare teachingMethods: string

  // 3.5 Nombre de la unidad temática
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare name: string

  // 3.6 Unidad de competencia u objetivo
  @Column({
    type: DataType.TEXT,
  })
  declare competenceObjective: string

  // Fechas de la unidad
  @Column({
    type: DataType.DATEONLY,
  })
  declare startDate: string

  @Column({
    type: DataType.DATEONLY,
  })
  declare endDate: string

  @Column({
    type: DataType.DATEONLY,
  })
  declare evaluationDate: string

  @Column({
    type: DataType.INTEGER,
  })
  declare totalSessions: number

  // 3.19 Precisiones de la unidad temática
  @Column({
    type: DataType.TEXT,
  })
  declare precisions: string

  // Relación con sesiones
  @HasMany(() => SessionActivity)
  declare sessions: SessionActivity[]
}
