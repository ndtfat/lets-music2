import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'$components/*': 'src/components/*',
			'$store/*': 'src/store/*',
		}
	}
};

export default config;
