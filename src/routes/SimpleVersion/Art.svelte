<script>
	import { getContext } from 'svelte';
	import VideoPic from './ClipsPic.svelte';
	import LinkPic from './FeaturedPic.svelte';

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
</script>

<h1>Graphics</h1>

<div class="art-section">
	<div class="body-container">
		<h2 class="art-section-title">Featured Animations</h2>
	</div>
	<div class="masonry-wrapper" class:expanded={showMoreLink}>
		<div class="art-grid">
			{#each linkItems as data}
				<LinkPic img={images[`art/${data[1]}`]} dim={data[2]} url={data[3]} />
			{/each}
		</div>
	</div>
	<button class="show-more-btn" onclick={() => (showMoreLink = !showMoreLink)}>
		{showMoreLink ? 'Show Less' : 'Show More'}
	</button>
</div>

<div class="art-section">
	<div class="body-container">
		<h2 class="art-section-title">Animation Clips</h2>
	</div>
	<div class="masonry-wrapper" class:expanded={showMoreVid}>
		<div class="art-grid">
			{#each vidItems as data}
				<VideoPic
					vid={videos[`${data[1]}.mp4`]}
					dim={data[2]}
					webm={videos[`${data[1]}.webm`]}
					tb={images[`art/${data[3]}`]}
				/>
			{/each}
		</div>
	</div>
	<button class="show-more-btn" onclick={() => (showMoreVid = !showMoreVid)}>
		{showMoreVid ? 'Show Less' : 'Show More'}
	</button>
</div>

<div class="art-section">
	<div class="body-container">
		<h2 class="art-section-title">Stills</h2>
	</div>
	<div class="masonry-wrapper" class:expanded={showMoreImg}>
		<div class="art-grid">
			{#each imgItems as data}
				<img class="art-grid-item art-img" src={images[`art/${data[1]}`]} alt="art img" />
			{/each}
		</div>
	</div>
	<button class="show-more-btn" onclick={() => (showMoreImg = !showMoreImg)}>
		{showMoreImg ? 'Show Less' : 'Show More'}
	</button>
</div>

<style lang="scss">
	.art-section {
		position: relative;
		height: fit-content;
	}

	.masonry-wrapper {
		background-color: #0f221f;
		max-height: 550px;
		overflow-y: hidden;
		transition: max-height 0.5s ease;
		border-radius: 8px;

		&:not(.expanded)::after {
			content: '';
			position: absolute;
			bottom: calc(40px + 0.6rem);
			left: 0;
			width: 100%;
			height: 200px;
			max-height: calc(100% - 100px);
			background: linear-gradient(transparent 0%, #054830 90%);
			pointer-events: none;
			z-index: 2;
		}

		&.expanded {
			max-height: none;
		}
	}

	.art-grid {
		height: 100%;
		padding: 20px 16px;
		column-gap: 16px;
		row-gap: 4px;

		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		overflow-x: hidden;
	}

	:global(.art-grid-item) {
		position: relative;
		z-index: 2;
		height: 275px;
		width: auto;
		max-width: 45%;
		display: block;
		object-fit: cover;
		margin-bottom: 10px;
	}

	.show-more-btn {
		display: block;
		margin: 32px auto;
		padding: 10px 32px;
		background-color: #eed695;
		color: #1d413c;
		border: none;
		border-radius: 2rem;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			background-color: #0f221f;
			color: #eed695;
		}
	}

	.body-container {
		margin: 0 auto;
		padding: 0 1.5rem;
		max-width: calc(900px + 1.5rem);
		text-align: center;
		margin-bottom: 1rem;
	}

	@media (max-width: 1200px) {
		.art-grid {
			column-count: 3;
		}
	}

	@media (max-width: 992px) {
		.art-grid {
			column-count: 2;
		}
	}
</style>
