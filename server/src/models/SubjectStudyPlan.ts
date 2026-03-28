import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import StudyPlan from './StudyPlan'
import Subject from './Subject'

@Table({
  tableName: 'subject_study_plans',
  timestamps: true,
})
class SubjectStudyPlan extends Model {
  @ForeignKey(() => Subject)
  @Column({
    type: DataType.INTEGER,
  })
  declare subjectId: number

  @ForeignKey(() => StudyPlan)
  @Column({
    type: DataType.INTEGER,
  })
  declare studyPlanId: number
}

export default SubjectStudyPlan
