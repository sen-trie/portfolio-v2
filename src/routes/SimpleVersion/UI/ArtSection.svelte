<script>
	let { children, title, showMore, toggleFn } = $props();
</script>

<div class="art-section">
	<h2 class="art-section-title">{title}</h2>
	<div class="masonry-wrapper" class:expanded={showMore}>
		<div class="art-grid">
			{@render children()}
		</div>
	</div>
	<button class="click-button show-more-btn" onclick={() => toggleFn()}>
		{showMore ? 'Show less' : 'Show more'}
	</button>
</div>

<style lang="scss">
	.art-section {
		position: relative;
		height: fit-content;
		margin-bottom: 40px;
	}

	.masonry-wrapper {
		background-color: #0f221f;
		max-height: 550px;
		overflow-y: hidden;
		transition: max-height 0.5s ease;
		border: 2px solid rgba(255, 255, 255, 0.2);
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
		padding: 32px 16px;
		column-gap: 16px;
		row-gap: 16px;

		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		overflow-x: hidden;

		:global(picture) {
			height: 275px;
			width: auto;
			max-width: 45%;
			filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.7));
		}

		:global(picture img) {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.show-more-btn {
		position: relative;
		z-index: 5;
		margin: 32px auto;
		background-color: #eed695;
		color: #1d413c;
		transition: all 0.3s ease;

		&:hover {
			background-color: #0f221f;
			color: #eed695;
		}
	}

	.art-section-title {
		margin: 24px 0;
		padding-top: 28px;
		border-top: 2px solid white;
	}

	.art-section-title:first-of-type {
		margin-top: 16px;
	}

	@media (max-width: 768px) {
		:global(.art-grid-div) {
			max-width: unset !important;
		}

		.art-grid {
			padding: 20px 16px;
			column-gap: 8px;
			row-gap: 8px;

			:global(picture) {
				height: 150px;
				width: auto;
				max-width: 100%;
			}
		}
	}
</style>
