import { db } from '@/config/db'
import colors from 'colors'
import { QueryTypes } from 'sequelize'

async function addDigitalResourcePublicationColumns() {
  try {
    await db.authenticate()

    await db.query(`
      ALTER TABLE digital_didactic_resources
      ADD COLUMN IF NOT EXISTS "publicSlug" VARCHAR(255);
    `)

    await db.query(`
      ALTER TABLE digital_didactic_resources
      ADD COLUMN IF NOT EXISTS "isPublished" BOOLEAN NOT NULL DEFAULT false;
    `)

    await db.query(`
      ALTER TABLE digital_didactic_resources
      ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP WITH TIME ZONE;
    `)

    const existingIndex = await db.query<{ indexname: string }>(
      `
        SELECT indexname
        FROM pg_indexes
        WHERE tablename = 'digital_didactic_resources'
          AND indexname = 'digital_didactic_resources_public_slug_unique';
      `,
      { type: QueryTypes.SELECT }
    )

    if (existingIndex.length === 0) {
      await db.query(`
        CREATE UNIQUE INDEX digital_didactic_resources_public_slug_unique
        ON digital_didactic_resources ("publicSlug")
        WHERE "publicSlug" IS NOT NULL;
      `)
    }

    console.log(colors.green('Columnas públicas de RDD listas.'))
    await db.close()
  } catch (error) {
    console.error(colors.red('Error agregando columnas públicas de RDD:'), error)
    await db.close()
    process.exit(1)
  }
}

addDigitalResourcePublicationColumns()
