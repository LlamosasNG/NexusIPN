import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
    AllowNull
} from 'sequelize-typescript';
import User from './User';
import Subject from './Subject';
import { PlanningContent } from '@/interfaces/PlanningInterfaces';

export enum PlanningStatus {
    DRAFT = 'Borrador',
    SENT = 'Enviada',
    APPROVED = 'Aprobada',
    REJECTED = 'Rechazada',
    LATE = 'Desfasado'
}

@Table({
    tableName: 'plannings',
    timestamps: true
})
export default class Planning extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    period: string; // Ejemplo: "2026-1"

    @Default(PlanningStatus.DRAFT)
    @Column({
        type: DataType.ENUM(...Object.values(PlanningStatus))
    })
    status: PlanningStatus;

    // Aquí guardamos la estructura dinámica de la plantilla (Objetivos, Estrategias, etc.)
    @Column({
        type: DataType.JSONB
    })
    content: PlanningContent;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Subject)
    @Column
    subjectId: number;

    @BelongsTo(() => Subject)
    subject: Subject;

    @Column({
        type: DataType.DATE
    })
    submissionDate: Date;

    @Column({
        type: DataType.TEXT
    })
    feedback: string; // Para la retroalimentación de la academia
}