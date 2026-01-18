<script>
	// import Header from '$lib/components/Header.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import '../app.scss';
	import { setContext } from 'svelte';

	let { children } = $props();

	function simplify(obj, path) {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [key.split(path)[1], value])
		);
	}

	const images = import.meta.glob('$lib/assets/images/**/*.{jpg,jpeg,png,webp,apng,svg}', {
		eager: true,
		import: 'default'
	});

	const videos = import.meta.glob('$lib/assets/videos/**/*.{mp4,webm,mov}', {
		eager: true,
		import: 'default'
	});

	setContext('images', simplify(images, '/assets/images/'));
	setContext('videos', simplify(videos, '/assets/videos/'));
</script>

<div class="main-body article-body">
	{@render children()}
</div>

<style>
	.article-body {
		margin: 0 auto;
		flex-grow: 1;
		width: 100%;
	}
</style>
