<script>
	import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
	import { getContext, onMount } from 'svelte';
	import ArtSection from './ArtSection.svelte';
	import VideoPic from './ClipsPic.svelte';
	import FeaturedPic from './FeaturedPic.svelte';

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
		['vid', 'vid3', [1920, 1080], 'vid3.png', 'vid3T'],
		[
			'link',
			'tb5.jpg',
			[1920, 1080],
			'https://www.youtube.com/embed/RgBwLQty8B4?si=zJjELShQgkC0S_xP'
		],
		[
			'link',
			'tb3.jpg',
			[1920, 1080],
			'https://www.youtube.com/embed/_uEzKYpAo58?si=zJjELShQgkC0S_xP'
		],
		[
			'link',
			'tb1.png',
			[1920, 1080],
			'https://www.youtube.com/embed/vHGuVzc_z68?si=zJjELShQgkC0S_xP'
		],
		[
			'link',
			'tb2.png',
			[2880, 1206],
			'https://www.youtube.com/embed/1YzAhbeAiUE?si=zJjELShQgkC0S_xP'
		]
	];

	const imgItems = artItems.filter((data) => data[0] === 'img');
	const vidItems = artItems.filter((data) => data[0] === 'vid');
	const linkItems = artItems.filter((data) => data[0] === 'link');

	let showMoreImg = $state(false);
	let showMoreVid = $state(false);
	let showMoreLink = $state(false);

	let dialogEl = $state(null);
	let url = $state('');

	function openDialog(e, newUrl) {
		e.preventDefault();
		if (!dialogEl) return;

		url = newUrl;
		dialogEl.showModal();
		disableBodyScroll(document.body, { reserveScrollBarGap: true });
	}

	function closeDialog() {
		if (!dialogEl) return;

		url = '';
		dialogEl.close();
		enableBodyScroll(document.body);
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
	{#each linkItems as data}
		<FeaturedPic img={images[`art/${data[1]}`]} dim={data[2]} url={data[3]} {openDialog} />
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
	<button class="close-btn" onclick={closeDialog} aria-label="close-dialog">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M18 6l-12 12" />
			<path d="M6 6l12 12" />
		</svg>
	</button>
	<div class="dialog-content">
		<div class="video-container">
			<iframe
				src={url}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</div>
		<div class="video-info">
			<h2>Rin's Solo Camp</h2>
			<h4>2025/12/10</h4>

			<h3>AAA</h3>
		</div>
	</div>
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

	dialog {
		border: none;
		background: transparent;
		padding: 16px 16px;
		margin: auto;
		filter: drop-shadow(0 0 16px black);

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.85);
			backdrop-filter: blur(4px);
		}

		.close-btn {
			position: absolute;
			z-index: 99;
			right: 0;
			top: 0;
			background: black;
			border: 2px solid hsla(0, 0%, 100%, 0.5);
			border-radius: 50%;
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
		}

		.dialog-content {
			position: relative;
			display: flex;
			width: 1200px;
			max-height: calc(100vh - 4rem);

			justify-content: space-between;
			background-color: #1a1a1a;
			border-radius: 1rem;
			overflow: hidden;

			.video-container {
				position: relative;
				width: 60%;
				height: auto;

				padding-bottom: 56.25%;
				overflow: hidden;

				iframe {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border: none;
				}
			}

			.video-info {
				flex-grow: 1;
				text-align: left;
			}
		}
	}
</style>
