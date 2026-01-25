<script>
	import { getContext } from 'svelte';

	let { project } = $props();
	const images = getContext('images');

	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';

	let carousel = $state(null);
	let showCarousel = $derived(project.image.length > 1);

	const handleNextClick = () => {
		carousel.goToNext();
	};
</script>

{#if browser}
	<div class="carousel-container">
		{#if showCarousel}
			<Carousel bind:this={carousel}>
				{#each project.image as image}
					{#if images[`dev/${image}.png`]?.default}
						<enhanced:img
							class="embla__slide"
							src={images[`dev/${image}.png`].default}
							alt={project.imageAlt}
						/>
					{/if}
				{/each}
			</Carousel>
		{:else}
			<enhanced:img
				class="embla__slide"
				src={images[`dev/${project.image[0]}.png`]?.default}
				alt={project.imageAlt}
			/>
		{/if}
	</div>
{/if}

<style lang="scss">
	.carousel-container {
		height: auto;
		width: 100%;
		aspect-ratio: 16 / 10;
		overflow: hidden;

		:global(> div) {
			height: 100%;
			width: 100%;
			gap: 8px;

			:global(> div:first-child) {
				height: calc(100% - 24px);
			}
		}
	}

	:global(.sc-carousel-button) {
		background-color: #e19898 !important;
		width: 24px !important;
		height: 24px !important;
	}

	:global(.sc-carousel-dot__dot) {
		background-color: #000000 !important;
		opacity: 0.7 !important;
		width: 10px !important;
		height: 10px !important;
		border-radius: 100px !important;
	}

	:global(.sc-carousel-dot__dot_active) {
		background-color: #e19898 !important;
		opacity: 1 !important;
	}

	:global(.sc-carousel-dots__container) {
		column-gap: 6px;
	}

	:global(.sc-carousel__arrow-container:first-of-type) {
		position: absolute;
		z-index: 1;
		left: 8px;
		align-self: center;
	}

	:global(.sc-carousel__arrow-container:last-of-type) {
		position: absolute;
		z-index: 1;
		right: 8px;
		align-self: center;
	}

	:global(.sc-carousel-arrow__circle) {
		border: 2px solid rgba(255, 255, 255, 0.3) !important;
	}

	picture,
	img {
		height: 100%;
		user-drag: none;
		-webkit-user-drag: none;
		-moz-user-select: none;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		scale: 0.98;
		filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.7));
	}

	@media (max-width: 768px) {
		.carousel-container {
			aspect-ratio: 16 / 11;
		}
	}
</style>
