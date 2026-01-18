<script>
	import { getContext } from 'svelte';
	import ArtSection from './ArtSection.svelte';
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

<ArtSection
	title={'Featured Animations'}
	showMore={showMoreLink}
	toggleFn={() => (showMoreLink = !showMoreLink)}
>
	{#each linkItems as data}
		<LinkPic img={images[`art/${data[1]}`]} dim={data[2]} url={data[3]} />
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
	}
</style>
