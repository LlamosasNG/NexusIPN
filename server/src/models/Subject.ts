import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript'
import Academy from './Academy'
import Planning from './Planning'
import StudyPlan from './StudyPlan'
import SubjectStudyPlan from './SubjectStudyPlan'
import User from './User'
import UserSubject from './UserSubject'

@Table({
  tableName: 'subjects',
})
class Subject extends Model {
  @ForeignKey(() => Academy)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare academyId: number

  @BelongsTo(() => Academy)
  declare academy: Academy

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(20),
  })
  declare code: string
  
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare academicUnit: string

  @Column({
    type: DataType.JSON,
  })
  declare studyPlanNames: string[]

  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  declare semester: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare areaFormation: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare modality: string

  @Column({
    type: DataType.JSON,
  })
  declare type: string[]

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare creditsTepic: number

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare weeksPerSemester: number

  @Column({
    type: DataType.JSON,
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

  @Column({
    type: DataType.TEXT,
  })
  declare generalObjective: string

  @Column({
    type: DataType.JSON,
  })
  declare units: { name: string; competency: string }[]

  @BelongsToMany(() => User, () => UserSubject)
  declare users: User[]

  @HasMany(() => Planning)
  declare plannings: Planning[]

  @BelongsToMany(() => StudyPlan, () => SubjectStudyPlan)
  declare studyPlans: StudyPlan[]
}

export default Subject
