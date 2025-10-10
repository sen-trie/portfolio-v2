import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$models: 'src/lib/components/models'
		},
		adapter: adapter()
	}
};

export default config;
