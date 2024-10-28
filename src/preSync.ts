import { dirname } from 'node:path'

import { fileURLToPath } from 'node:url'

import axios from 'axios'
import fs from 'fs'
import { myOrvalEnvs } from './myOrvalEnvs'

const preSync = async () => {
  try {
    const response = await axios.get<string>(
      myOrvalEnvs.PUBLIC_API_URL + '/swagger.yaml',
    )

    // https://stackoverflow.com/a/50052194
    const __dirname = dirname(fileURLToPath(import.meta.url))
    fs.writeFileSync(__dirname + '/swagger.yaml', response.data)

    console.log(
      '✅ Swagger file has been fetched and saved to /src/swagger.yaml',
    )

    console.log('🔃 Generating orval files...')
  } catch (e) {
    console.error(e)
  }
}

preSync()
