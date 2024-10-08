import fs from 'fs'
import { dirname } from 'node:path'

import { fileURLToPath } from 'node:url'

const preSync = async () => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url))

    console.log(
      '✅ Swagger file has been fetched and saved to /src/swagger.yaml',
    )

    // rewrite /src/generated/api.ts .replace('const endpoints', 'export const endpoints')

    const apiTs = fs.readFileSync(__dirname + '/generated/api.ts', 'utf-8')
    fs.writeFileSync(
      __dirname + '/generated/api.ts',
      apiTs.replace('const endpoints', 'export const endpoints'),
    )

    console.log('🔃 Generating orval files...')
  } catch (e) {
    console.error(e)
  }
}

preSync()
