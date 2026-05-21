import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript'
import { normalizeAcademicPeriod } from '@/utils/academicPeriod'

@Table({
  tableName: 'planning_submission_deadlines',
  timestamps: true,
})
export default class PlanningSubmissionDeadline extends Model {
  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    set(value: string) {
      this.setDataValue('period', normalizeAcademicPeriod(value))
    },
  })
  declare period: string

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare deadlineAt: Date
}
