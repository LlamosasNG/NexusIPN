import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import Subject from './Subject'
import User from './User'

@Table({
  tableName: 'academies',
})
class Academy extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @Column({
    type: DataType.TEXT,
  })
  declare description: string

  @HasMany(() => User)
  declare users: User[]

  @HasMany(() => Subject)
  declare subjects: Subject[]
}

export default Academy
