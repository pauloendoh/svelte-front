import { defineConfig } from 'orval'

export default defineConfig({
  main: {
    input: './src/swagger.yaml',
    output: {
      mode: 'tags-split',
      target: './src/orval',

      override: {
        mutator: {
          path: './src/lib/utils/myAxios.ts',
          name: 'myRequest',
        },
      },
    },
  },
  zod: {
    input: './src/swagger.yaml',
    output: {
      mode: 'tags-split',
      target: './src/orval',
      client: 'zod',
      fileExtension: '.zod.ts',
      override: {
        zod: {
          generate: {
            body: true,
            header: true,
            param: true,
            query: true,
            response: true,
          },
          generateEachHttpStatus: true,
        },
      },
    },
  },
})
