import { defineConfig } from 'orval';
import { myEnvs } from './src/myEnvs';

export default defineConfig({
	main: {
		input: './src/swagger.yaml',
		output: {
			mode: 'tags-split',
			target: './src/orval',
			baseUrl: myEnvs.API_URL
		}
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
						response: true
					},
					generateEachHttpStatus: true
				}
			}
		}
	}
});
