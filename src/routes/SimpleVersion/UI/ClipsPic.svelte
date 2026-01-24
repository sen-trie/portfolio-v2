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

<div class="art-grid-div art-grid-item flexbox">
	<video bind:this={videoEl} width={dim[0]} height={dim[1]} controls playsinline preload="metadata">
		<source src={`${vid}#t=0`} type="video/mp4" />
		<source src={`${webm}#t=0`} type="video/webm" />
		Your browser does not support the video tag.
	</video>
	<enhanced:img bind:this={thumbEl} src={tb} alt="" class="video-thumb" />
	<svg
		bind:this={svgEl}
		class="icon icon-tabler"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		fill="transparent"
		stroke="#eed695"
		stroke-width="10px"
		stroke-linejoin="round"
		width="56"
		height="56"
		viewBox="0 0 163.861 163.861"
		xml:space="preserve"
	>
		<g>
			<path
				d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275   c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"
			/>
		</g>
	</svg>
</div>

<style lang="scss">
	:global(.art-grid-div video) {
		height: inherit;
		width: 100%;
		height: 100%;
		cursor: pointer;
		object-fit: cover;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
	}

	.art-grid-div {
		picture,
		img {
			position: absolute;
			width: unset;
			height: unset;
			object-fit: cover;
			inset: 0;
			pointer-events: none;
			margin-bottom: 0;
		}

		.icon-tabler {
			padding: 12px;
		}
	}
</style>
