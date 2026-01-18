<script>
	import { onMount } from 'svelte';

	let { dim, vid, webm, tb } = $props();

	let videoEl = $state(null);
	let thumbEl = $state(null);
	let svgEl = $state(null);

	function hideThumb() {
		if (thumbEl) thumbEl.style.display = 'none';
		if (svgEl) svgEl.style.display = 'none';
	}

	function showThumb() {
		if (thumbEl) thumbEl.style.display = 'block';
		if (svgEl) svgEl.style.display = 'block';
	}

	onMount(() => {
		if (videoEl) {
			videoEl.addEventListener('play', hideThumb);
			videoEl.addEventListener('ended', showThumb);
			videoEl.addEventListener('pointerdown', hideThumb);
		}

		return () => {
			if (videoEl) {
				videoEl.removeEventListener('play', hideThumb);
				videoEl.removeEventListener('ended', showThumb);
				videoEl.removeEventListener('pointerdown', hideThumb);
			}
		};
	});
</script>

<div class="art-grid-div art-grid-item">
	<video bind:this={videoEl} width={dim[0]} height={dim[1]} controls playsinline preload="metadata">
		<source src={`${vid}#t=0`} type="video/mp4" />
		<source src={`${webm}#t=0`} type="video/webm" />
		Your browser does not support the video tag.
	</video>
	<img bind:this={thumbEl} src={tb} alt="" class="video-thumb" />
	<svg
		bind:this={svgEl}
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-hand-click"
		width="56"
		height="56"
		viewBox="0 0 24 24"
		stroke-width="1"
		stroke="#eed695"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
		<path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
		<path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
		<path
			d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"
		/>
		<path d="M5 3l-1 -1" />
		<path d="M4 7h-1" />
		<path d="M14 3l1 -1" />
		<path d="M15 6h1" />
	</svg>
</div>

<style lang="scss">
	:global(.art-grid-div video) {
		height: inherit;
		width: 100%;
		cursor: pointer;
		object-fit: cover;
		inset: 0;
	}

	.art-grid-div {
		position: relative;
		overflow: hidden;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: cover;
			inset: 0;
			pointer-events: none;
		}

		svg {
			position: absolute;
			transform-origin: bottom right;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 6px;
			border: 2px solid hsla(44, 72%, 76%, 0.7);
			background-color: hsla(0, 0%, 0%, 0.8);
			border-radius: 100%;
			pointer-events: none;
		}
	}
</style>
