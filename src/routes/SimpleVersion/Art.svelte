<script>
	import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
	import { getContext, onMount } from 'svelte';
	import ArtSection from './UI/ArtSection.svelte';
	import VideoPic from './UI/ClipsPic.svelte';
	import FeaturedPic from './UI/FeaturedPic.svelte';
	import ArtDialogue from './UI/ArtDialogue.svelte';
	import featuredData from '$lib/db/art-video.json';

	const images = getContext('images');
	const videos = getContext('videos');

	const artItems = [
		['img', 'pic12.png', 1874, 970],
		['img', 'pic11.webp', 768, 768],
		['img', 'pic13.jpg', 1151, 1151],
		['img', 'pic14.jpg', 2560, 2560],
		['img', 'ono.jpg', 2160, 3840],
		['img', 'izakaya_bg_art.jpg', 2560, 2560],
		['img', 'izakaya_bg_dev.jpg', 2560, 2560],
		['img', 'pic10.png', 2162, 1496],
		['img', 'pic5.png', 3590, 2019],
		['img', 'pic8.png', 1905, 1072],
		['img', 'pic9.png', 1920, 1080],
		['img', 'pic3.png', 3840, 2160],
		['img', 'pic2.png', 1535, 861],
		['img', 'pic6.webp', 1920, 1080],
		['img', 'pic1.png', 2576, 1574],
		['vid', 'vid_broom', [1920, 1080], 'broom_tb.jpg', 'vid2T'],
		['vid', 'vid_laser', [1920, 1080], 'laser_tb.jpg', 'vid2T'],
		['vid', 'vid7', [1920, 1080], 'vid7.png', 'vid7T'],
		['vid', 'vid6', [1920, 1080], 'vid6.png', 'vid6T'],
		['vid', 'vid5', [1920, 1080], 'vid5.png', 'vid5T'],
		['vid', 'vid4', [1920, 1080], 'vid4.png', 'vid4T'],
		['vid', 'vid2', [1920, 1080], 'vid2.png', 'vid2T'],
		['vid', 'vid3', [1920, 1080], 'vid3.png', 'vid3T']
	];

	const imgItems = artItems.filter((data) => data[0] === 'img');
	const vidItems = artItems.filter((data) => data[0] === 'vid');

	let showMoreImg = $state(false);
	let showMoreVid = $state(false);
	let showMoreLink = $state(false);

	let dialogEl = $state(null);
	let key = $state(null);
	let isLoading = $state(true);

	const featureKeys = Object.keys(featuredData);

	function cycleKeys(forwards = true) {
		if (key === null) {
			key = featureKeys[0];
			return;
		}

		isLoading = true;
		key =
			featureKeys[
				(featureKeys.indexOf(key) + (forwards ? 1 : -1) + featureKeys.length) % featureKeys.length
			];
	}

	let videoInfoEl = $state(null);

	function openDialog(e, newKey) {
		e.preventDefault();
		if (!dialogEl) return;

		key = newKey;
		isLoading = true;
		dialogEl.showModal();
		// disableBodyScroll(document.body, { reserveScrollBarGap: true });

		// setTimeout(() => {
		// 	if (videoInfoEl) {
		// 		enableBodyScroll(videoInfoEl);
		// 	}
		// }, 100);
	}

	function closeDialog() {
		if (!dialogEl) return;

		key = '';
		dialogEl.close();
		// clearAllBodyScrollLocks();
	}

	onMount(() => {
		return closeDialog;
	});
</script>

<h1 class="content-title">Graphics</h1>

<ArtSection
	title={'Featured Animations'}
	showMore={showMoreLink}
	toggleFn={() => (showMoreLink = !showMoreLink)}
>
	{#each Object.entries(featuredData) as data}
		{#if data && data[1] && data[1].img}
			<FeaturedPic img={images[`art/${data[1].img}`]} key={data[0]} {openDialog} />
		{/if}
	{/each}
</ArtSection>

<ArtSection
	title={'Animation Clips'}
	showMore={showMoreVid}
	toggleFn={() => (showMoreVid = !showMoreVid)}
>
	{#each vidItems as data}
		<VideoPic
			vid={videos[`${data[1]}.mp4`]}
			dim={data[2]}
			webm={videos[`${data[1]}.webm`]}
			tb={images[`art/${data[3]}`]}
		/>
	{/each}
</ArtSection>

<ArtSection title={'Stills'} showMore={showMoreImg} toggleFn={() => (showMoreImg = !showMoreImg)}>
	{#each imgItems as data}
		<img class="art-grid-item art-img" src={images[`art/${data[1]}`]} alt="art img" />
	{/each}
</ArtSection>

<dialog bind:this={dialogEl} onclick={(e) => e.target === dialogEl && closeDialog()}>
	<ArtDialogue
		{key}
		content={featuredData[key]}
		{closeDialog}
		{isLoading}
		{cycleKeys}
		bind:videoInfoEl
		handleLoad={() => {
			isLoading = false;
		}}
	/>
</dialog>

<style lang="scss">
	:global(.art-grid-item) {
		position: relative;
		z-index: 2;
		height: 275px;
		width: auto;
		max-width: 45%;
		display: block;
		object-fit: cover;
		margin-bottom: 10px;
		filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.7));
	}

	$transition-duration: 0.3s;

	dialog {
		border: none;
		background: transparent;
		padding: 16px 16px;
		margin: auto;
		filter: drop-shadow(0 0 16px black);
		transition:
			opacity $transition-duration ease,
			display $transition-duration ease allow-discrete;
		opacity: 0;

		&[open] {
			opacity: 1;
		}

		@starting-style {
			&[open] {
				opacity: 0;
			}
		}

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.7);
			backdrop-filter: blur(4px);
			transition:
				opacity $transition-duration ease,
				backdrop-filter $transition-duration ease,
				display $transition-duration ease allow-discrete;
			opacity: 0;
		}

		&[open]::backdrop {
			opacity: 1;
		}

		@starting-style {
			&[open]::backdrop {
				opacity: 0;
			}
		}
	}

	@media (max-width: 768px) {
		.art-img {
			height: 150px;
		}

		dialog {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100dvh;
			gap: 24px;
			padding: 48px 0 20px;
		}
	}
</style>
