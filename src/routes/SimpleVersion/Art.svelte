<script>
	import { getContext } from 'svelte';

	const images = getContext('images');

	const artItems = [
		['img', 'pic1.png', 2576, 1574],
		['img', 'pic2.png', 1535, 861],
		['img', 'pic3.png', 3840, 2160],
		['img', 'pic4.jpg', 2160, 3840],
		['img', 'pic5.png', 3590, 2019],
		['img', 'pic7.png', 1920, 1080],
		['img', 'pic8.png', 1905, 1072],
		['img', 'pic9.png', 1920, 1080],
		['img', 'pic10.png', 2162, 1496],
		['img', 'pic11.webp', 768, 768],
		['img', 'pic12.png', 1874, 970],
		['img', 'pic13.jpg', 1151, 1151],
		['img', 'pic14.jpg', 2560, 2560],
		['vid', 'vid1', [1920, 1080], 'vid1W', 'vid1T'],
		['vid', 'vid2', [1920, 1080], 'vid2W', 'vid2T'],
		['vid', 'vid3', [1920, 1080], 'vid3W', 'vid3T'],
		['vid', 'vid4', [1920, 1080], 'vid4W', 'vid4T'],
		['vid', 'vid5', [1920, 1080], 'vid5W', 'vid5T'],
		['vid', 'vid6', [1920, 1080], 'vid6W', 'vid6T'],
		['vid', 'vid7', [1920, 1080], 'vid7W', 'vid7T'],
		['link', 'tb1', [1920, 1080], 'https://www.youtube.com/embed/vHGuVzc_z68?si=zJjELShQgkC0S_xP'],
		['link', 'tb2', [2880, 1206], 'https://www.youtube.com/embed/1YzAhbeAiUE?si=zJjELShQgkC0S_xP'],
		['link', 'tb3', [1920, 1080], 'https://www.youtube.com/embed/_uEzKYpAo58?si=zJjELShQgkC0S_xP'],
		['link', 'tb4', [1920, 1080], 'https://www.youtube.com/embed/SN2EYs8_nmA?si=zJjELShQgkC0S_xP'],
		['link', 'tb5', [1920, 1080], 'https://www.youtube.com/embed/RgBwLQty8B4?si=zJjELShQgkC0S_xP']
	];

	function shuffle(array) {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	const imgItems = shuffle(artItems.filter((data) => data[0] === 'img'));
	const vidItems = shuffle(artItems.filter((data) => data[0] === 'vid'));
	const linkItems = shuffle(artItems.filter((data) => data[0] === 'link'));

	const categoryTextDict = {
		img: 'Still images showcasing individual scenes or concepts.',
		short: 'Short animated projects, focusing on character motions. Can be played by clicking.',
		video:
			'Flagship animation projects. These works push my technical and creative skills to the limit as I explore a concept (e.g storytelling) as far as I can.'
	};

	let showMoreImg = $state(false);
	let showMoreVid = $state(false);
	let showMoreLink = $state(false);
</script>

<h1>Graphics</h1>

<div class="art-section">
	<div class="body-container">
		<h2 class="art-section-title">Stills</h2>
		<h3>{categoryTextDict['img']}</h3>
	</div>
	<div class="masonry-wrapper" class:expanded={showMoreImg}>
		<div class="art-grid">
			{#each imgItems as data}
				<img
					class="art-grid-item art-img"
					src={images[`art/${data[1]}`]}
					loading="lazy"
					alt="art img"
				/>
			{/each}
		</div>
	</div>
	<button class="show-more-btn" onclick={() => (showMoreImg = !showMoreImg)}>
		{showMoreImg ? 'Show Less' : 'Show More'}
	</button>
</div>

<div class="art-section">
	<div class="body-container">
		<h2 class="art-section-title">Clips</h2>
		<h3>{categoryTextDict['short']}</h3>
	</div>
	<div class="masonry-wrapper">
		<div class="art-grid" class:expanded={showMoreVid}>
			{#each vidItems as data}
				<!-- <VideoPic vid={images[data[1]]} dim={data[2]} webm={images[data[3]]} tb={images[data[4]]} /> -->
			{/each}
		</div>
	</div>

	<button class="show-more-btn" onclick={() => (showMoreVid = !showMoreVid)}>
		{showMoreVid ? 'Show Less' : 'Show More'}
	</button>
</div>

<div class="art-section">
	<div class="body-container">
		<h2 class="art-section-title">Exhibits</h2>
		<h3>{categoryTextDict['video']}</h3>
	</div>
	<div class="art-grid" class:expanded={showMoreLink}>
		{#each linkItems as data}
			<!-- <LinkPic img={images[data[1]]} dim={data[2]} url={data[3]} /> -->
		{/each}
	</div>
	<button class="show-more-btn" onclick={() => (showMoreLink = !showMoreLink)}>
		{showMoreLink ? 'Show Less' : 'Show More'}
	</button>
</div>

<style lang="scss">
	.art-section {
		position: relative;
		height: fit-content;
	}

	.masonry-wrapper {
		background-color: #0f221f;
		max-height: 600px;
		overflow-y: hidden;
		transition: max-height 0.5s ease;

		&:not(.expanded)::after {
			content: '';
			position: absolute;
			bottom: calc(40px + 0.6rem);
			left: 0;
			width: 100%;
			height: 300px;
			max-height: calc(100% - 100px);
			background: linear-gradient(transparent, hsl(159, 87%, 15%, 1));
			pointer-events: none;
			z-index: 11;
		}

		&.expanded {
			max-height: none;
		}
	}

	.art-grid {
		height: 100%;
		column-count: 4;
		column-gap: 12px;
		font-size: 0px;
	}

	:global(.art-grid-item) {
		position: relative;
		z-index: 2;
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
		margin-bottom: 10px;
	}

	.show-more-btn {
		display: block;
		margin: 1rem auto;
		padding: 0.75rem 2rem;
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

	@media (max-width: 768px) {
		.art-grid {
			column-count: 2;
		}
	}

	@media (max-width: 576px) {
		.art-grid {
			column-count: 1;
		}
	}
</style>
