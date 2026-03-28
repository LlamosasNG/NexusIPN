import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import Planning from './Planning'

@Table({
  tableName: 'plagiarism_tools',
  timestamps: true,
})
export default class PlagiarismTool extends Model {
  @AllowNull(false)
  @ForeignKey(() => Planning)
  @Column({
    type: DataType.INTEGER,
  })
  declare planningId: number

  @BelongsTo(() => Planning)
  declare planning: Planning

  // 5. Herramienta seleccionada
  @Default('ninguna')
  @Column({
    type: DataType.ENUM('ithenticate', 'turnitin', 'ninguna'),
  })
  declare selectedTool: string
}
