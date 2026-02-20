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
import User from './User'
import UserSubject from './UserSubject'
import Planning from './Planning'

@Table({
  tableName: 'subjects',
})
class Subject extends Model {
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

  @Column({
    type: DataType.TEXT,
  })
  declare description: string

  @ForeignKey(() => Academy)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare academyId: number

  @BelongsTo(() => Academy)
  declare academy: Academy

  @BelongsToMany(() => User, () => UserSubject)
  declare users: User[]

  @HasMany(() => Planning)
  declare plannings: Planning[]
}

export default Subject
