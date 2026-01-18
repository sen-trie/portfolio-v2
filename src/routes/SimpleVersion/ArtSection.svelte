<script>
	let { children, title, showMore, toggleFn } = $props();
</script>

<div class="art-section">
	<div class="body-container">
		<h2 class="art-section-title">{title}</h2>
	</div>
	<div class="masonry-wrapper" class:expanded={showMore}>
		<div class="art-grid">
			{@render children()}
		</div>
	</div>
	<button class="show-more-btn" onclick={() => toggleFn()}>
		{showMore ? 'Show Less' : 'Show More'}
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
		border-radius: var(--border-radius);

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
		border-radius: var(--border-radius);
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
