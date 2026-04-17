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
  tableName: 'general_data',
  timestamps: true,
})
export default class GeneralData extends Model {
  @AllowNull(false)
  @ForeignKey(() => Planning)
  @Column({
    type: DataType.INTEGER,
  })
  declare planningId: number

  @BelongsTo(() => Planning)
  declare planning: Planning

  // 1.1 Unidad Académica
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare academicUnit: string

  // 1.2 Programa académico / Plan de estudios
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare program: string

  // 1.3 Unidad de aprendizaje
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare learningUnit: string

  // 1.4 Semestre / Nivel
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare semester: string

  // 1.5 Área de formación
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare areaFormation: string

  // 1.6 Modalidad
  @AllowNull(false)
  @Column({
    type: DataType.ENUM('Escolarizada', 'No escolarizada', 'Mixta'),
  })
  declare modality: string

  // 1.7 Tipo de unidad de aprendizaje
  @Column({
    type: DataType.JSONB,
  })
  declare unitType: string[]

  // 1.8 Créditos
  @Column({
    type: DataType.FLOAT,
  })
  declare creditsTepic: number

  @Column({
    type: DataType.FLOAT,
  })  
  declare creditsSatca: number

  // 1.9 Academia
  @Column({
    type: DataType.STRING,
  })
  declare academy: string

  // 1.10 Semanas por semestre
  @Column({
    type: DataType.INTEGER,
  })
  declare weeksPerSemester: number

  // 1.11 Sesiones por semestre
  @Column({
    type: DataType.JSONB,
  })
  declare sessionsPerSemester: {
    classroom: number
    laboratory: number
    clinic: number
    other: number
    total: number
  }

  // 1.12 Horas por semestre
  @Column({
    type: DataType.JSONB,
  })
  declare hoursPerSemester: {
    theory: number
    practice: number
    total1: number
    classroom: number
    laboratory: number
    clinic: number
    other: number
    total2: number
  }

  // 1.13 Periodo escolar
  @Column({
    type: DataType.STRING,
  })
  declare schoolPeriod: string

  // 1.14 Grupos
  @Column({
    type: DataType.JSONB,
  })
  declare groups: string[]

  // 1.15 Nombre del docente (se saca del User, pero se guarda aquí para el PDF)
  @Column({
    type: DataType.STRING,
  })
  declare teacherName: string
}
