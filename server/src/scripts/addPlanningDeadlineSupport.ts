import { db } from '@/config/db'
import colors from 'colors'

async function addPlanningDeadlineSupport() {
  try {
    await db.authenticate()

    await db.query(`
      CREATE TABLE IF NOT EXISTS planning_submission_deadlines (
        id SERIAL PRIMARY KEY,
        period VARCHAR(255) NOT NULL UNIQUE,
        "deadlineAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `)

    await db.query(`
      ALTER TABLE plannings
      ADD COLUMN IF NOT EXISTS "isLate" BOOLEAN NOT NULL DEFAULT false;
    `)

    await db.query(`
      ALTER TABLE plannings
      ADD COLUMN IF NOT EXISTS "lateMarkedAt" TIMESTAMP WITH TIME ZONE;
    `)

    await db.query(`
      ALTER TABLE plannings
      ADD COLUMN IF NOT EXISTS "deadlineAtSubmission" TIMESTAMP WITH TIME ZONE;
    `)

    await db.query(`
      UPDATE plannings
      SET
        status = 'Enviada',
        "isLate" = true,
        "lateMarkedAt" = COALESCE("submissionDate", "updatedAt", NOW())
      WHERE status = 'Desfasado';
    `)

    console.log(colors.green('Soporte de fechas límite de planeaciones listo.'))
    await db.close()
  } catch (error) {
    console.error(
      colors.red('Error agregando soporte de fechas límite de planeaciones:'),
      error
    )
    await db.close()
    process.exit(1)
  }
}

addPlanningDeadlineSupport()
