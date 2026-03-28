import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import Subject from './Subject'
import SubjectStudyPlan from './SubjectStudyPlan'

@Table({
  tableName: 'study_plans',
})
class StudyPlan extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @Column({
    type: DataType.TEXT,
  })
  declare description: string

  @BelongsToMany(() => Subject, () => SubjectStudyPlan)
  declare subjects: Subject[]
}

export default StudyPlan
