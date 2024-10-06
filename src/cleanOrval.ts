import { dirname } from 'node:path'

import { fileURLToPath } from 'node:url'

import fs from 'fs'

const cleanOrval = async () => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url))

    fs.rmdirSync(__dirname + '/orval', { recursive: true })

    console.log('✅ Deleted orval files.')
  } catch (e) {
    console.error(e)
  }
}

cleanOrval()
