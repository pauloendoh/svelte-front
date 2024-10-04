import { dirname } from 'node:path';

import { fileURLToPath } from 'node:url';

import axios from 'axios';
import fs from 'fs';
import { myEnvs } from './myEnvs';

const fetchSwagger = async () => {
	try {
		const response = await axios.get<string>(myEnvs.API_URL + '/swagger.yaml');

		// https://stackoverflow.com/a/50052194
		const __dirname = dirname(fileURLToPath(import.meta.url));
		fs.writeFileSync(__dirname + '/swagger.yaml', response.data);

		console.log('Swagger file has been fetched and saved to /src/swagger.yaml');
	} catch (e) {
		console.error(e);
	}
};

fetchSwagger();
